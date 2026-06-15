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
  top: 40%;
  width: min(70vw, 880px);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ellipse = styled.div`
  position: absolute;
  width: 80%;
  height: 45%;
  top: 25%;
  justify-self: center;
  border-radius: 50%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.94) 100%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: blur(20px);
  pointer-events: none;
`;

const Logo = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  object-position: center;
`;

const StartBtn = styled.button`
  margin-top: -100px;
  position: relative;
  z-index: 1;
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
      
      <Ellipse aria-hidden="true" />
      <Center>
        <Logo src="/assets/logo-rhythme.png" alt="Rhythme" />
        <StartBtn onClick={onStart}>리듬타러가기 ♫</StartBtn>
      </Center>
    </Page>
  );
}
