import React from "react";
import { alpha, Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";
import { JustTypo, JustTypoSizeOption } from "@bit/hessed.engspark.atoms";
import { FaBraille } from "react-icons/fa";
import { ColorOptionUnion } from "@bit/hessed.engspark.atoms/dist/styles/theme/palette.override";
import { IconType } from "react-icons";

interface NavProps {
  Icon: IconType;
  label: string;
  href: string;
  valid?: boolean;
  colUni: ColorOptionUnion;
}

const navLists: NavProps[] = [
  {
    Icon: FaBraille,
    href: "/voc-analyser",
    label: "단어 말하기 분석 엔진",
    colUni: "primary",
    valid: true,
  },
  {
    Icon: FaBraille,
    href: "/",
    label: "준비중...",
    colUni: "primary",
  },
  {
    Icon: FaBraille,
    href: "/",
    label: "준비중 ...",
    colUni: "primary",
  },
  {
    Icon: FaBraille,
    href: "/",
    label: "준비중 ...",
    colUni: "primary",
  },
];

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <JustTypo sz="xl" ff="logo" className="mb-5 text-center">
        Hessed-Engspark <br />
        선생님 도구모음
      </JustTypo>
      <RootBox>
        <Grid container spacing={2}>
          {navLists.map((x, i) => (
            <Grid item xs={6} key={i}>
              <Link href={x.href}>
                <NavPaper colUni={x.colUni}>
                  {x.valid && (
                    <IconWrapper>
                      <FaBraille />
                    </IconWrapper>
                  )}
                  <JustTypo ff="guide" sz="md">
                    {x.label}
                  </JustTypo>
                </NavPaper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </RootBox>
    </div>
  );
}

const RootBox = styled.div(({ theme }) => ({
  width: 500,
  height: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const NavPaper = styled(Paper).attrs({ elavation: 5 })<{
  colUni: ColorOptionUnion;
}>(({ theme, colUni }) => ({
  width: 250,
  height: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  "&:hover": {
    background: alpha(theme.palette[colUni].main, 0.5),
    [IconWrapper]: {
      "& svg": {
        fill: "#fff !important",
      },
    },
    "& p": {
      color: "#fff",
    },
  },
}));

const IconWrapper = styled.span<{
  colUni?: ColorOptionUnion;
  sz?: JustTypoSizeOption;
}>(({ theme, colUni = "primary", sz = "xl" }) => ({
  padding: theme.spacing(1),
  "& svg": {
    fontSize: "2rem",
    fill: theme.palette[colUni].main,
  },
}));
