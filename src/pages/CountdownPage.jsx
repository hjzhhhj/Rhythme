import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const countPop = keyframes`
  0%   { transform: scale(2.0) rotate(-5deg); opacity: 0; }
  40%  { transform: scale(0.88) rotate(2deg); opacity: 1; }
  70%  { transform: scale(1.06) rotate(-1deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const goPopIn = keyframes`
  0%   { transform: scale(0.3) rotate(-15deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const Page = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background: rgba(255, 255, 255, 0.2);
  pointer-events: none;
`;

const TitleWrap = styled.div`
  position: absolute;
  top: 10%;
  left: 25%;
  width: 50%;
  height: 38%;
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2%;

  @media (max-width: 640px) {
    left: 10%;
    width: 80%;
    height: 32%;
  }
`;

const TitleEllipse = styled.div`
  position: absolute;
  width: 150%;
  height: 200%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0) 70%
  );
  filter: blur(25px);
  top: -20%;
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

const CountNumber = styled.div`
  position: relative;
  z-index: 2;
  line-height: 1;
  margin-top: 12vh;
  user-select: none;

  ${({ $isGo }) =>
    $isGo
      ? css`
          font-family: var(--font-display);
          font-size: clamp(60px, 14vw, 200px);
          color: #fa94c0;
          -webkit-text-stroke: clamp(2px, 0.4vw, 6px) #e85fa0;
          filter: drop-shadow(0 8px 24px rgba(250, 148, 192, 0.55));
          animation: ${goPopIn} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        `
      : css`
          font-family: var(--font-handwriting);
          font-size: clamp(80px, 18vw, 240px);
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
      <CountNumber $isGo={count === 0} key={count}>
        {count === 0 ? "GO!" : count}
      </CountNumber>
    </Page>
  );
}
