import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const countPop = keyframes`
  0% { transform: scale(2) rotate(-5deg); opacity: 0; }
  40% { transform: scale(0.88) rotate(2deg); opacity: 1; }
  70% { transform: scale(1.06) rotate(-1deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const goPopIn = keyframes`
  0% { transform: scale(0.3) rotate(-15deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

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

const BgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.18);
  pointer-events: none;
`;

const TitleWrap = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  width: min(58vw, 720px);
  height: 29%;
  transform: translateX(-50%);
  z-index: 1;
  pointer-events: none;
  display: grid;
  place-items: center;

  @media (max-height: 620px) {
    top: 7%;
    height: 27%;
  }
`;

const TitleEllipse = styled.div`
  position: absolute;
  width: 140%;
  height: 190%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.9) 44%,
    rgba(255, 255, 255, 0) 72%
  );
  filter: blur(25px);
`;

const TitleImg = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const CountPosition = styled.div`
  position: absolute;
  z-index: 2;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CountNumber = styled.div`
  line-height: 1;
  user-select: none;

  ${({ $isGo }) =>
    $isGo
      ? css`
          font-family: var(--font-display);
          font-size: clamp(66px, min(14vw, 28vh), 190px);
          color: #fa94c0;
          -webkit-text-stroke: clamp(2px, 0.4vw, 6px) #e85fa0;
          filter: drop-shadow(0 8px 24px rgba(250, 148, 192, 0.55));
          animation: ${goPopIn} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        `
      : css`
          font-family: var(--font-handwriting);
          font-size: clamp(96px, min(18vw, 32vh), 240px);
          font-weight: 700;
          color: #ffda60;
          -webkit-text-stroke: clamp(3px, 0.6vw, 8px) #f5a623;
          filter: drop-shadow(0 8px 24px rgba(245, 166, 35, 0.5));
          animation: ${countPop} 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        `}
`;

export default function CountdownPage({ onDone }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCount((c) => c - 1), 900);
    return () => clearTimeout(t);
  }, [count, onDone]);

  return (
    <Page>
      <BgImg src="/assets/bg-countdown.png" alt="" aria-hidden="true" />
      <BgOverlay aria-hidden="true" />
      <TitleWrap>
        <TitleEllipse aria-hidden="true" />
        <TitleImg src="/assets/title-countdown.png" alt="준비하세요!" />
      </TitleWrap>
      <CountPosition>
        <CountNumber $isGo={count === 0} key={count}>
          {count === 0 ? "GO!" : count}
        </CountNumber>
      </CountPosition>
    </Page>
  );
}
