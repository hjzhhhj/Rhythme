import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GameStaff from '../components/GameStaff';
import { generateGameSequence } from '../utils/gameData';
import { KEYBOARD_HINTS, NOTE_DATA, TOTAL_NOTES } from '../utils/notes';
import { saveRecord } from '../utils/storage';

const INPUT_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'q', 'w', 'e', 'r', 't', 'y', 'u'];
const SOUND_VOLUME = 0.22;
const SOUND_BASE = '/sounds/%EB%8F%84%EB%A0%88%EB%AF%B8%ED%8C%8C%EC%86%94%EB%9D%BC%EC%8B%9C%EB%8F%84';
const KEY_SOUND_NOTES = {
  a: 'C4',
  s: 'D4',
  d: 'E4',
  f: 'F4',
  g: 'G4',
  h: 'A4',
  j: 'B4',
  q: 'C#4',
  w: 'D#4',
  e: 'F4',
  r: 'F#4',
  t: 'G#4',
  y: 'A#4',
  u: 'C5',
};
const NOTE_SOUND_FILES = {
  C4: 'C4.mp3',
  'C#4': 'Cs4.mp3',
  D4: 'D4.mp3',
  'D#4': 'Ds4.mp3',
  E4: 'E4.mp3',
  F4: 'F4.mp3',
  'F#4': 'Fs4.mp3',
  G4: 'G4.mp3',
  'G#4': 'Gs4.mp3',
  A4: 'A4.mp3',
  'A#4': 'As4.mp3',
  B4: 'B4.mp3',
  C5: 'C5.mp3',
  D5: 'D4.mp3',
  E5: 'E4.mp3',
  F5: 'F4.mp3',
  G5: 'G4.mp3',
};

function getSoundSrc(file) {
  return `${SOUND_BASE}/${encodeURIComponent(file)}`;
}

const COLORS = {
  time: '#BBA4EE',
  heart: '#FF7878',
  pink: '#B83D70',
  outline: '#FA94C0',
};

const Page = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  font-family: 'GangwonEduSaeeum', sans-serif;
`;

const BgImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const Timer = styled.div`
  position: absolute;
  top: clamp(12px, 2.7vh, 34px);
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  color: ${COLORS.time};
  font-size: clamp(46px, min(6.5vw, 10vh), 100px);
  line-height: 0.9;
  letter-spacing: 0;
  user-select: none;
`;

const Stage = styled.main`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(76px, 15vh) auto 1fr;
  align-items: center;
  justify-items: center;
  padding: clamp(8px, 2vh, 24px) 48px clamp(14px, 3vh, 36px);

  @media (max-width: 720px) {
    padding-inline: 16px;
  }
`;

const StaffZone = styled.section`
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: clamp(0px, 1.2vh, 12px);
`;

const Prompt = styled.div`
  color: ${COLORS.outline};
  font-size: clamp(32px, min(4.4vw, 7vh), 70px);
  line-height: 1;
  margin-bottom: clamp(4px, 1.2vh, 12px);
  user-select: none;
`;

const LivesZone = styled.section`
  grid-row: 3;
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: clamp(10px, 2.2vh, 24px);
`;

const Hearts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, min(2.5vw, 4vh), 40px);
  height: clamp(58px, min(9vw, 13vh), 138px);
`;

const Heart = styled.span`
  color: ${COLORS.heart};
  font-size: clamp(62px, min(9.5vw, 14vh), 150px);
  line-height: 0.8;
  opacity: ${({ $active }) => ($active ? 1 : 0.95)};
  user-select: none;
`;

const WrongCount = styled.div`
  color: ${COLORS.heart};
  font-size: clamp(26px, min(3.6vw, 6vh), 60px);
  line-height: 1;
  margin-top: 4px;
  user-select: none;
`;

const KeyGuide = styled.aside`
  position: absolute;
  left: clamp(24px, 5vw, 92px);
  bottom: clamp(14px, 3vh, 42px);
  z-index: 2;
  color: ${COLORS.pink};
  line-height: 0.95;
  user-select: none;

  @media (max-width: 720px) {
    left: 20px;
    bottom: 18px;
  }

  @media (max-height: 700px) {
    transform: scale(0.82);
    transform-origin: left bottom;
  }
`;

const KeyGuideTitle = styled.div`
  font-size: clamp(26px, min(3.5vw, 5.6vh), 58px);
  white-space: nowrap;
`;

const KeyGuideRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(24px, 1fr));
  gap: clamp(9px, 1.8vw, 30px);
  margin-top: 8px;
  max-width: min(520px, calc(100vw - 40px));
`;

const KeyGuideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-width: 0;
`;

const KeyNote = styled.span`
  font-size: clamp(20px, min(2.5vw, 4vh), 42px);
  line-height: 0.9;
`;

const KeyLetter = styled.span`
  font-size: clamp(26px, min(3.4vw, 5.4vh), 56px);
  line-height: 0.9;
`;

const SharpKeyLetter = styled.span`
  font-size: clamp(21px, min(2.7vw, 4.5vh), 44px);
  line-height: 0.9;
  opacity: 0.72;
`;

const ResultOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(18px, 4vw, 48px);
  background: rgba(70, 70, 70, 0.34);
  color: ${COLORS.pink};
  text-align: center;
  backdrop-filter: grayscale(0.28);
`;

const ResultCard = styled.div`
  width: min(680px, 90vw);
  min-height: min(740px, 86vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(72px, 11vh, 104px) clamp(26px, 5vw, 72px)
    clamp(52px, 8vh, 78px);
  border-radius: clamp(24px, 3vw, 34px);
  background: #fff;

  @media (max-width: 720px) {
    min-height: min(560px, 82vh);
    padding-top: 58px;
  }
`;

const ResultTitleImage = styled.img`
  width: min(620px, 86%);
  height: auto;
  object-fit: contain;
  margin-bottom: clamp(30px, 5vh, 46px);
`;

const ResultTitle = styled.div`
  color: ${COLORS.outline};
  font-size: clamp(58px, 8vw, 108px);
  line-height: 0.9;
  margin-bottom: clamp(30px, 5vh, 46px);
`;

const ResultHearts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 3vw, 38px);
  height: clamp(72px, 10vw, 104px);
`;

const ResultHeart = styled.span`
  color: #eb7d79;
  font-size: clamp(76px, 10vw, 118px);
  line-height: 0.7;
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
  user-select: none;
`;

const ResultMeta = styled.div`
  color: #eb7d79;
  font-size: clamp(34px, 4.2vw, 50px);
  line-height: 1;
  margin-top: 14px;
`;

const ResultTime = styled.div`
  color: ${COLORS.time};
  font-size: clamp(48px, 6vw, 74px);
  line-height: 1;
  margin-top: clamp(34px, 5vh, 48px);
`;

const ResultButton = styled.button`
  min-width: min(320px, 64vw);
  min-height: 74px;
  margin-top: clamp(26px, 4vh, 38px);
  padding: 8px 34px 10px;
  border-radius: 7px;
  background: #e399c1;
  color: #fff;
  font-size: clamp(34px, 4.2vw, 48px);
  line-height: 1;

  &:hover {
    background: #df86b6;
  }
`;

function formatClock(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function GamePage({ difficulty = 'NORMAL', onGameOver }) {
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState({});
  const [finished, setFinished] = useState(null);
  const startAtRef = useRef(Date.now());
  const lockedRef = useRef(false);
  const savedRef = useRef(false);
  const audioRefs = useRef({});

  const finishGame = useCallback(
    (success, nextLives = lives) => {
      const finalTime = Date.now() - startAtRef.current;
      setElapsedMs(finalTime);
      setFinished({ success, time: finalTime, lives: nextLives });

      if (!savedRef.current) {
        savedRef.current = true;
        saveRecord({
          difficulty,
          time: finalTime,
          success,
          lives: nextLives,
        });
      }
    },
    [difficulty, lives],
  );

  useEffect(() => {
    setSequence(generateGameSequence(difficulty));
    setCurrentIndex(0);
    setLives(3);
    setElapsedMs(0);
    setFeedback(null);
    setResults({});
    setFinished(null);
    startAtRef.current = Date.now();
    lockedRef.current = false;
    savedRef.current = false;
  }, [difficulty]);

  useEffect(() => {
    if (finished || sequence.length === 0) return undefined;

    const timer = window.setInterval(() => {
      setElapsedMs(Date.now() - startAtRef.current);
    }, 200);

    return () => window.clearInterval(timer);
  }, [finished, sequence.length]);

  useEffect(() => {
    Object.entries(NOTE_SOUND_FILES).forEach(([note, file]) => {
      const audio = new Audio(getSoundSrc(file));
      audio.preload = 'auto';
      audio.volume = SOUND_VOLUME;
      audioRefs.current[note] = audio;
    });
  }, []);

  const playNoteSound = useCallback((noteKey) => {
    const note = NOTE_DATA[noteKey];
    const soundNote = note?.sound || noteKey;
    const file = NOTE_SOUND_FILES[soundNote];
    if (!file) return;

    const audio = audioRefs.current[soundNote] ?? new Audio(getSoundSrc(file));
    audioRefs.current[soundNote] = audio;
    audio.volume = SOUND_VOLUME;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const playKeySound = useCallback((pressedKey, currentNoteKey) => {
    const currentNote = NOTE_DATA[currentNoteKey];
    const soundNote =
      currentNote?.key.toLowerCase() === pressedKey
        ? currentNote.sound || currentNoteKey
        : KEY_SOUND_NOTES[pressedKey];
    const file = NOTE_SOUND_FILES[soundNote];
    if (!file) return;

    const audio = audioRefs.current[soundNote] ?? new Audio(getSoundSrc(file));
    audioRefs.current[soundNote] = audio;
    audio.volume = SOUND_VOLUME;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (finished || lockedRef.current || sequence.length === 0) return;

      const pressedKey = event.key.toLowerCase();
      if (!INPUT_KEYS.includes(pressedKey)) return;

      event.preventDefault();

      const currentNoteKey = sequence[currentIndex];
      const currentNote = NOTE_DATA[currentNoteKey];
      if (!currentNote) return;
      playKeySound(pressedKey, currentNoteKey);

      if (currentNote.key.toLowerCase() === pressedKey) {
        lockedRef.current = true;
        setFeedback('correct');
        setResults((prev) => ({ ...prev, [currentIndex]: 'correct' }));

        window.setTimeout(() => {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          setFeedback(null);
          lockedRef.current = false;

          if (nextIndex >= TOTAL_NOTES) {
            finishGame(true, lives);
          }
        }, 260);
      } else {
        lockedRef.current = true;
        setFeedback('wrong');

        const nextLives = Math.max(0, lives - 1);
        setLives(nextLives);

        window.setTimeout(() => {
          setFeedback(null);
          lockedRef.current = false;

          if (nextLives <= 0) {
            finishGame(false, nextLives);
          }
        }, 280);
      }
    },
    [currentIndex, finishGame, finished, lives, playKeySound, sequence],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Page>
      <BgImg src="/assets/bg-sheet.png" alt="" aria-hidden="true" />
      <Timer>{formatClock(elapsedMs)}</Timer>

      <Stage>
        <StaffZone>
          <Prompt>click!</Prompt>
          <GameStaff
            sequence={sequence}
            currentIndex={currentIndex}
            feedback={feedback}
            results={results}
            onNoteClick={playNoteSound}
          />
        </StaffZone>

        <LivesZone>
          <Hearts aria-label={`남은 라이프 ${lives}개`}>
            {[0, 1, 2].map((index) => (
              <Heart key={index} $active={index < lives}>
                {index < lives ? '♥' : '♡'}
              </Heart>
            ))}
          </Hearts>
          <WrongCount>틀린 횟수 ({3 - lives}/3)</WrongCount>
        </LivesZone>
      </Stage>

      <KeyGuide aria-label="키보드 입력 안내">
        <KeyGuideTitle>도 레 미 파 솔 라 시 (KEY)</KeyGuideTitle>
        <KeyGuideRow>
          {KEYBOARD_HINTS.map((item) => (
            <KeyGuideItem key={item.key}>
              <SharpKeyLetter>{item.sharpKey}</SharpKeyLetter>
              <KeyNote>{item.note}</KeyNote>
              <KeyLetter>{item.key}</KeyLetter>
            </KeyGuideItem>
          ))}
        </KeyGuideRow>
      </KeyGuide>

      {finished && (
        <ResultOverlay role="dialog" aria-modal="true" aria-label="게임 결과">
          <ResultCard>
            {finished.success ? (
              <ResultTitleImage src="/assets/good.png" alt="잘했어요!" />
            ) : (
              <ResultTitle>GAME OVER</ResultTitle>
            )}
            <ResultHearts aria-label={`남은 라이프 ${finished.lives}개`}>
              {[0, 1, 2].map((index) => (
                <ResultHeart key={index} $active={index < finished.lives}>
                  ♥
                </ResultHeart>
              ))}
            </ResultHearts>
            <ResultMeta>틀린 횟수 ({3 - finished.lives}/3)</ResultMeta>
            <ResultTime>{formatClock(finished.time)}</ResultTime>
            <ResultButton onClick={() => onGameOver?.(currentIndex, finished.time)}>
              돌아가기 ♫
            </ResultButton>
          </ResultCard>
        </ResultOverlay>
      )}
    </Page>
  );
}
