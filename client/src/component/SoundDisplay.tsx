import styled from "styled-components";
import { Container } from "next/app";
import React from "react";
import {
  PhoneScoreInfoFragment,
  SyllableScoreInfoFragment,
  TextScoreInfoFragment,
} from "../generated/gql";
import { ColorOptionUnion } from "@bit/hessed.engspark.atoms/dist/styles/theme/palette.override";
import { JustTypo } from "@bit/hessed.engspark.atoms";
import { blue, green, red } from "@material-ui/core/colors";

interface Props {
  infos: TextScoreInfoFragment;
}

const SoundDisplay = ({ infos }: Props) => {
  const { word_score_list } = infos;
  const {
    phone_score_list,
    quality_score,
    syllable_score_list,
  } = word_score_list[0];

  return (
    <div className="p-4">
      <Container maxWidth="lg">
        <div className="w-full flex justify-center py-3">
          <JustTypo>{`점수 : ${quality_score} 점`}</JustTypo>
        </div>
        <div className="p-3 flex flex-wrap items-center justify-center">
          {phone_score_list.map((x, i) => (
            <PhoneDisplayer {...x} key={`phone-${i}`} />
          ))}
        </div>
        <div className="p-3 flex flex-wrap items-center justify-center">
          {syllable_score_list.map((x, i) => (
            <SyllableDisplayer {...x} key={`syllable-${i}`} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SoundDisplay;

interface PhoneProps extends PhoneScoreInfoFragment {}

const PhoneDisplayer: React.FC<PhoneProps> = ({
  phone,
  sound_most_like,
  stress_level,
  quality_score,
}) => {
  return (
    <Block stressLevel={stress_level} score={quality_score}>
      {phone}
      <ScoreDispaly score={quality_score}>
        {quality_score.toFixed(0)}
      </ScoreDispaly>
    </Block>
  );
};

interface SyllableProps extends SyllableScoreInfoFragment {}

const SyllableDisplayer: React.FC<SyllableProps> = ({
  letters,
  stress_level,
  stress_score,
  quality_score,
}) => {
  return (
    <Block stressLevel={stress_level} score={quality_score}>
      {letters}
      <ScoreDispaly score={quality_score}>
        {quality_score.toFixed(0)}
      </ScoreDispaly>
    </Block>
  );
};

interface BlockProps {
  stressLevel: number;
  score: number;
}

const Block = styled.div<BlockProps>(({ theme, stressLevel, score }) => {
  const baseFs = 1;
  const fontSize = baseFs + stressLevel * 0.7;
  const bgUni: ColorOptionUnion =
    score < 30 ? "danger" : score < 70 ? "secondary" : "success";
  return {
    fontFamily: theme.typography.fontFamily,
    padding: theme.spacing(1, 2),
    fontSize: fontSize + "rem",
    background: theme.palette[bgUni].main,
    borderRadius: 15,
    marginRight: theme.spacing(1.5),
    position: "relative",
  };
});

const ScoreDispaly = styled.span<{ score: number }>(({ theme, score }) => {
  const bg = score < 30 ? red[500] : score < 70 ? blue[500] : green[500];
  return {
    fontFamily: theme.typography.fontFamily,
    fontSize: "0.5rem",
    position: "absolute",
    right: 0,
    top: -10,
    padding: theme.spacing(1),
    background: bg,
    borderRadius: "50%",
  };
});
