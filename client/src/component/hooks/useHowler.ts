import React, { useEffect, useMemo, useRef, useState } from "react";
import { Howl, HowlOptions, SoundSpriteDefinitions } from "howler";
import { isNumber } from "lodash";

interface Props<T> {
  source: string | undefined | null;
  sprites?: T;
  options?: HowlOptions;
}

export interface HowlState {
  duration: number;
  ready: boolean;
  playing: boolean;
}

type HowlPlay<T extends SoundSpriteDefinitions> = (sprite?: keyof T) => void;
export interface HowlActions<T extends SoundSpriteDefinitions> {
  play: HowlPlay<T>;
  pause: () => void;
  stop: () => void;
}

type UseHowlerReturn<T extends SoundSpriteDefinitions> = [
  HowlState,
  HowlActions<T>
];

function useHowler<T extends SoundSpriteDefinitions = {}>({
  source,
  sprites,
  options = {},
}: Props<T>): UseHowlerReturn<T> {
  const [duration, setDuration] = useState(0);
  const [ready, setready] = useState(false);
  const [playing, setPlaying] = useState(false);
  const howler = useRef<Howl | null>(null);
  useEffect(() => {
    if (!source) {
      return;
    }
    setready(false);
    howler.current = new Howl({
      src: source,
      sprite: sprites,
      preload: true,
      ...options,
      onload: () => handleOnLoad(),
    }).load();
    howler.current.on("play", () => handleOnPlay());
    howler.current.on("stop", () => handleOnStop());
    howler.current.on("pause", () => handleOnPause());
    howler.current.on("end", () => handleOnEnd());
    return () => howler.current?.unload();
  }, [source]);

  const handleOnLoad = () => {
    const dur = howler.current?.duration();

    setDuration(dur ?? 0);
    setready(isNumber(dur) && dur > 0);
  };
  const handleOnPlay = () => {
    setPlaying(true);
    options?.onplay && options.onplay(1); // THIS 1 is dummy number
  };
  const handleOnEnd = () => {
    setPlaying(false);
    options.onend && options.onend(1);
  };
  const handleOnStop = () => {
    setPlaying(false);
    options?.onstop && options.onstop(1);
  };
  const handleOnPause = () => {
    setPlaying(false);
    options?.onpause && options.onpause(1);
  };

  const howlState: HowlState = useMemo(() => ({ duration, ready, playing }), [
    duration,
    ready,
    playing,
  ]);

  const play = (sprite?: keyof T) =>
    howler.current && howler.current.play((sprite as string) ?? undefined);
  const pause = () => howler.current?.pause();
  const stop = () => howler.current?.stop();

  const howlActions: HowlActions<T> = useMemo(
    () => ({
      play: (args) => play(args),
      pause: () => pause(),
      stop: () => stop(),
    }),
    [play, pause, stop]
  );

  return [howlState, howlActions];
}

export default useHowler;
