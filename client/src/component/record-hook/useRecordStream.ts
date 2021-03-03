import { useCallback, useEffect, useRef, useState } from "react";
import RecordRTC from "recordrtc";

interface Props {
  onNoMedia: () => void;
  onStop: (blob: Blob) => void;
}

export interface UseRecorderState {
  streamState: MediaStream | null;
  analyser: AnalyserNode | null;
  audBlobUrl: string | null;
  recording: boolean;
}

export interface UseRecorderAction {
  start: (duration?: number) => void;
  stop: () => Promise<Blob | void>;
  reset: () => Promise<void>;
}

type UseAudioStreamReturn = [UseRecorderState, UseRecorderAction];

const useRecorderStream2 = ({
  onNoMedia,
  onStop,
}: Props): UseAudioStreamReturn => {
  const [recording, setrecording] = useState(false);
  const [streamState, setstream] = useState<MediaStream | null>(null);
  const [context, setcontext] = useState<AudioContext | null>(null);
  const [source, setsource] = useState<MediaStreamAudioSourceNode | null>(null);
  const [analyser, setanalyser] = useState<AnalyserNode | null>(null);
  const [audBlobUrl, setaudBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (streamState) {
        streamState.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const rtc = useRef<RecordRTC | null>(null);
  const stampDur = useRef<number | null>(null);
  const start = async (duration?: number) => {
    if (!Boolean(navigator?.getUserMedia)) {
      return onNoMedia();
    }
    if (Boolean(streamState)) {
      await terminate();
      await initStream(duration);
      return;
    }
    initStream(duration);
  };
  const stop = useCallback(async () => {
    rtc.current?.stopRecording(() => {
      const blob = rtc.current?.getBlob();
      setrecording(false);
      if (blob) {
        const url = URL.createObjectURL(blob);
        setaudBlobUrl(url);
        onStop(blob);
      }
    });
  }, [rtc, audBlobUrl, onStop]);

  const initStream = async (duration?: number) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const RTC = await import("recordrtc");
    setstream(stream);
    rtc.current = new RTC.default(stream, {
      mimeType: "audio/webm",
      numberOfAudioChannels: 1,
      timeSlice: 200,
      onTimeStamp: (stamp) => onTimeStamp(stamp),
    });

    const audCtx = new AudioContext();
    const src = audCtx.createMediaStreamSource(stream);
    const analyserNode = src.context.createAnalyser();
    analyserNode.smoothingTimeConstant = 1;
    src.connect(analyserNode);
    setsource(src);
    setcontext(audCtx);
    setanalyser(analyserNode);
    if (duration) {
      stampDur.current = new Date().getTime() + duration * 2 * 1000;
    }
    rtc.current.startRecording();
    setrecording(true);
  };

  const onTimeStamp = (stamp: number) => {
    if (!stampDur.current) {
      return;
    }
    if (stamp > stampDur.current) {
      stop();
    }
  };

  const terminate = async () => {
    await context?.close();
    source?.disconnect();
    streamState?.getTracks().forEach((track) => track.stop());
    setsource(null);
    setcontext(null);
    setanalyser(null);
  };

  const reset = async () => {
    await terminate();
    setaudBlobUrl(null);
    rtc.current?.destroy();
  };

  const audStates: UseRecorderState = {
    analyser,
    audBlobUrl,
    streamState,
    recording,
  };

  const audActions: UseRecorderAction = {
    start,
    stop,
    reset,
  };

  return [audStates, audActions];
};

export default useRecorderStream2;
