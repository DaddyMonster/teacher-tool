import { TextField } from "@material-ui/core";
import styled from "styled-components";
import React from "react";

interface Props {
  txt: string;
  onChange: (txt: string) => void;
}

const InputSection = ({ onChange, txt }: Props) => {
  return (
    <Root>
      <TextField
        variant="outlined"
        label="단어입력"
        value={txt}
        onChange={(e) => onChange(e.target.value)}
      />
    </Root>
  );
};

export default InputSection;

const Root = styled.div(({ theme }) => ({
  padding: theme.spacing(2),
  width: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  bottom: theme.spacing(3),
}));
