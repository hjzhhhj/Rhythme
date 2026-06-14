import React from 'react';
import styled from 'styled-components';
import { DIFFICULTY_CONFIG } from '../utils/notes';
import { getRecords, formatTime } from '../utils/storage';

const DIFFICULTIES = ['EASY', 'NORMAL', 'HARD', 'HELL'];

const Page = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 4vh;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  pointer-events: none;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleEllipse = styled.div`
  position: absolute;
  width: 80%;
  height: 200%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0) 70%);
  filter: blur(20px);
  top: -30%;
`;

const TitleImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 50%;
`;

const Cards = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: clamp(10px, 1.8vw, 28px);
  justify-content: center;
  margin-bottom: 3vh;
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: clamp(130px, 17vw, 220px);
  height: clamp(190px, 25vw, 320px);
  border-radius: 20px;
  padding: 20px 14px 16px;
  color: #fff;
  border: none;
  cursor: pointer;
  background: ${({ $bg }) => $bg};
  box-shadow: 0 8px 28px rgba(0,0,0,0.14);
  transition: transform 0.18s, box-shadow 0.18s;
  gap: 8px;

  &:hover {
    transform: translateY(-10px) scale(1.06);
    box-shadow: 0 18px 40px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(2px) scale(0.96);
  }
`;

const DiffLabel = styled.span`
  font-family: var(--font-display);
  font-size: clamp(18px, 2.5vw, 38px);
  letter-spacing: 1px;
  align-self: flex-start;
`;

const DiffIcon = styled.span`
  font-size: clamp(60px, 9vw, 130px);
  line-height: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DiffBest = styled.span`
  font-family: var(--font-body);
  font-size: clamp(10px, 1.1vw, 14px);
  opacity: 0.9;
  background: rgba(255,255,255,0.28);
  border-radius: 8px;
  padding: 3px 10px;
  white-space: nowrap;
`;

const BackBtn = styled.button`
  position: relative;
  z-index: 2;
  background: none;
  border: none;
  color: rgba(255,255,255,0.85);
  font-family: var(--font-display);
  font-size: clamp(14px, 1.8vw, 22px);
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 0 1px 4px rgba(0,0,0,0.2);
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
        {DIFFICULTIES.map(diff => {
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
