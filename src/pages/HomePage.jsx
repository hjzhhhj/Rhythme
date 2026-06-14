import React from "react";
import styled from "styled-components";

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

const Center = styled.div`
  position: relative;
  z-index: 1;
  width: 65%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-top: -10vh;
`;

const Ellipse = styled.div`
  position: absolute;
  width: 140%;
  height: 250%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.95) 30%,
    rgba(255, 255, 255, 0) 75%
  );
  filter: blur(30px);
  pointer-events: none;
`;

const Logo = styled.img`
  margin-top: -12vh;
  position: relative;
  z-index: 1;
  width: 120%;
  height: auto;
  object-fit: contain;
  object-position: center 35%;
  filter: drop-shadow(0 4px 20px rgba(250, 148, 192, 0.2));
`;

const StartBtn = styled.button`
  position: relative;
  z-index: 1;
  padding: 4px 36px;
  background: #fa94c0;
  color: #fff;
  font-family: "GangwonEduSaeeum", sans-serif;
  margin-top: -24vh;
  font-size: clamp(24px, 5vw, 42px);
  font-weight: 200;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  letter-spacing: 1px;
  box-shadow: 0 6px 24px rgba(250, 148, 192, 0.5);
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
