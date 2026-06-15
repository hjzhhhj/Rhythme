import React from "react";
import styled from "styled-components";
import { DIFFICULTY_CONFIG } from "../utils/notes";
import { getRecords, formatTime } from "../utils/storage";

const DIFFICULTIES = ["EASY", "NORMAL", "HARD", "HELL"];

const Page = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
`;

const BgImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const TitleWrap = styled.div`
  position: absolute;
  z-index: 1;
  top: 8%;
  left: 50%;
  width: min(62vw, 740px);
  height: 28%;
  transform: translateX(-50%);
  pointer-events: none;
  display: grid;
  place-items: center;

  @media (max-height: 620px) {
    top: 5%;
    height: 26%;
  }
`;

const TitleEllipse = styled.div`
  position: absolute;
  width: 128%;
  height: 180%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.92) 26%,
    rgba(255, 255, 255, 0) 70%
  );
  filter: blur(20px);
`;

const TitleImg = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const Cards = styled.div`
  position: absolute;
  z-index: 2;
  top: 51%;
  left: 50%;
  width: min(86vw, 1060px);
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: clamp(18px, 2.4vw, 32px);
  justify-content: center;

  align-items: center;
  align-content: center;

  @media (max-width: 640px) {
    top: 35%;
    bottom: 8vh;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 20px;
  }
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: clamp(150px, 18vw, 280px);
  height: clamp(190px, 26vw, 370px);
  border-radius: 20px;
  padding: 20px 14px 16px;
  color: #fff;
  background: ${({ $bg }) => $bg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.18s,
    box-shadow 0.18s;

  &:hover {
    transform: translateY(-8px) scale(1.035);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateY(2px) scale(0.97);
  }
`;

const DiffLabel = styled.span`
  font-family: var(--font-display);
  font-size: clamp(20px, min(2.3vw, 4.2vh), 34px);
  line-height: 1;
  letter-spacing: 1px;
  text-align: center;
`;

const DiffIcon = styled.span`
  font-size: clamp(60px, 9vw, 160px);
  line-height: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DiffBest = styled.span`
  font-family: var(--font-body);
  font-size: clamp(10px, min(1vw, 2vh), 13px);
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.28);
  border-radius: 8px;
  padding: 3px 10px;
  white-space: nowrap;
  text-align: center;
`;

const BackBtn = styled.button`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 4%;
  transform: translateX(-50%);
  background: none;
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-display);
  font-size: clamp(18px, min(2vw, 3.6vh), 28px);
  line-height: 1;
  padding: 8px 20px;
  border-radius: 8px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  transition: color 0.15s;

  &:hover {
    color: #fff;
  }
`;

export default function DifficultyPage({ onSelect, onBack }) {
  const records = getRecords();

  return (
    <Page>
      <BgImg src="/assets/bg-difficulty.png" alt="" aria-hidden="true" />
      <TitleWrap>
        <TitleEllipse aria-hidden="true" />
        <TitleImg src="/assets/title-difficulty.png" alt="난이도를 선택하세요!" />
      </TitleWrap>
      <Cards>
        {DIFFICULTIES.map((diff) => {
          const cfg = DIFFICULTY_CONFIG[diff];
          const best = records.best[diff];
          return (
            <Card key={diff} $bg={cfg.color} onClick={() => onSelect(diff)}>
              <DiffLabel>{cfg.label}</DiffLabel>
              <DiffIcon>{cfg.icon}</DiffIcon>
              {best != null && <DiffBest>🏆 {formatTime(best)}</DiffBest>}
            </Card>
          );
        })}
      </Cards>
      <BackBtn onClick={onBack}>← 돌아가기</BackBtn>
    </Page>
  );
}
