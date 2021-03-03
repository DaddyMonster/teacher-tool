import { JustButtonC, JustButtonT, JustTypo } from "@bit/hessed.engspark.atoms";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import InputSection from "../../component/InputSection";
import useRecorderStream2 from "../../component/record-hook/useRecordStream";
import useVocVoiceReport from "../../component/record-hook/useVocAnalyser";
import SoundDisplay from "../../component/SoundDisplay";
import TextDisplay from "../../component/TextDisplay";
import { useTestConnectionQuery } from "../generated/gql";

export default function Home() {
  const [txt, settxt] = useState("");

  const [{ reportData }, { analyseVocBlob }] = useVocVoiceReport({
    fileName: txt,
    text: txt,
  });
  const { data: testResult, error } = useTestConnectionQuery();

  const connected = useMemo(() => {
    if (error) {
      return "error";
    } else if (Boolean(testResult)) {
      return "connected";
    }
    return "loading";
  }, [testResult, error]);

  const [{ recording }, { start, stop, reset }] = useRecorderStream2({
    onNoMedia: () => {},
    onStop: (blob) => analyseVocBlob(blob),
  });

  useEffect(() => {
    console.log(reportData);
  }, [reportData]);

  const resetStates = () => {
    reset();
    settxt("");
  };

  return (
    <Root>
      <JustTypo sz="sm">{`Connection : ${connected}`}</JustTypo>
      <TextDisplay txt={txt} />
      {recording && (
        <div className="p-5">
          <JustTypo>녹음중입니다...</JustTypo>
          <JustButtonC bgUnion="danger" onClick={() => stop()}>
            녹음 중단
          </JustButtonC>
        </div>
      )}
      {!recording && (
        <JustButtonC bgUnion="primary" onClick={() => start()}>
          녹음 시작
        </JustButtonC>
      )}
      <div className="w-full flex justify-center p-3">
        <JustButtonT onClick={resetStates}>리셋</JustButtonT>
      </div>
      {reportData && <SoundDisplay infos={reportData} />}
      <InputSection txt={txt} onChange={(txt) => settxt(txt)} />
    </Root>
  );
}

const Root = styled.div(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
}));
