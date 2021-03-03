import { Paper } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import InputSection from "../../component/InputSection";
import SoundDisplay from "../../component/SoundDisplay";
import TextDisplay from "../../component/TextDisplay";

export default function Home() {
  const [txt, settxt] = useState("");
  const [recorded, setrecorded] = useState(null);
  return (
    <Root>
      <TextDisplay txt={txt} />
      <SoundDisplay />
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
