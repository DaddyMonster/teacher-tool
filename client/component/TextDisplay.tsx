import React from "react";
import { JustTypo } from "@bit/hessed.engspark.atoms";
interface Props {
  txt: string;
}

const TextDisplay = ({ txt }: Props) => {
  return (
    <div className="p-4 w-full flex justify-center items-center">
      <JustTypo ff="logo" colUni="primary" style={{ fontSize: "4rem" }}>
        {txt}
      </JustTypo>
    </div>
  );
};

export default TextDisplay;
