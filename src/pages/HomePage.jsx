import React from "react";
import styled from "styled-components";

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

const Center = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: min(70vw, 880px);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 760px) {
    width: 82vw;
  }

  @media (max-height: 620px) {
    top: 50%;
    width: min(62vw, 760px);
  }
`;

const Ellipse = styled.div`
  position: absolute;
  width: 140%;
  height: 145%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.94) 22%,
    rgba(255, 255, 255, 0) 72%
  );
  filter: blur(28px);
  pointer-events: none;
`;

const Logo = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 48vh;
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 4px 20px rgba(250, 148, 192, 0.2));
`;

const StartBtn = styled.button`
  position: relative;
  z-index: 1;
  margin-top: clamp(-34px, -4.8vh, -18px);
  padding: clamp(6px, 1.1vh, 9px) clamp(28px, 4vw, 44px);
  background: #fa94c0;
  color: #fff;
  font-family: "GangwonEduSaeeum", sans-serif;
  font-size: clamp(24px, min(3.5vw, 5.2vh), 38px);
  font-weight: 200;
  line-height: 1;
  border-radius: 6px;
  box-shadow: 0 6px 22px rgba(250, 148, 192, 0.45);
  white-space: nowrap;
  transition:
    transform 0.15s,
    box-shadow 0.15s;

  &:hover {
    transform: translateY(-0.25px) scale(1.04);
    box-shadow: 0 6px 24px rgba(250, 148, 192, 0.6);
  }

  &:active {
    transform: translateY(1px) scale(0.97);
  }
`;

export default function HomePage({ onStart }) {
  return (
    <Page>
      <BgImg src="/assets/bg-home.png" alt="" aria-hidden="true" />
      <Center>
        <Ellipse aria-hidden="true" />
        <Logo src="/assets/logo-rhythme.png" alt="Rhythme" />
        <StartBtn onClick={onStart}>리듬타러가기 ♫</StartBtn>
      </Center>
    </Page>
  );
}
