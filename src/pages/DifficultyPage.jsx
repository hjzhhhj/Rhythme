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
  left: 50%;
  width: min(66vw, 880px);
  height: clamp(116px, 21vh, 180px);
  transform: translateX(-50%);
  pointer-events: none;
  display: grid;
  place-items: center;

  @media (max-width: 760px) {
    top: 8vh;
    width: 86vw;
    height: 20vh;
  }
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
  top: clamp(300px, 44vh, 360px);
  left: 50%;
  width: min(88vw, 1200px);
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: clamp(24px, 2.4vw, 36px);

  @media (max-width: 820px) {
    top: 36vh;
    width: min(82vw, 560px);
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    gap: 16px;
  }
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
  aspect-ratio: 0.89;
  border-radius: 12px;
  padding: clamp(28px, 3.8vh, 40px) clamp(12px, 1.4vw, 18px) clamp(24px, 3.8vh, 36px);
  color: #fff;
  background: ${({ $bg }) => $bg};
  box-shadow: none;
  transition: transform 0.18s;

  &:hover {
    transform: translateY(-7px) scale(1.025);
  }

  &:active {
    transform: translateY(2px) scale(0.97);
  }
`;

const DiffLabel = styled.span`
  font-family: var(--font-display);
  font-size: clamp(27px, min(2.8vw, 5vh), 43px);
  line-height: 1;
  letter-spacing: 1px;
  text-align: center;
`;

const DiffIcon = styled.span`
  font-family: var(--font-musical);
  font-size: clamp(92px, min(9.5vw, 16vh), 150px);
  line-height: 1;
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(22px, 3.2vh, 34px);
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
  bottom: 3.5vh;
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
              {best != null && <DiffBest>🔥 {formatTime(best)}</DiffBest>}
            </Card>
          );
        })}
      </Cards>
      <BackBtn onClick={onBack}>← 돌아가기</BackBtn>
    </Page>
  );
}
