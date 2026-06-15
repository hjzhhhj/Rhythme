import React, { useState, useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';
import HomePage from './pages/HomePage';
import DifficultyPage from './pages/DifficultyPage';
import CountdownPage from './pages/CountdownPage';
import GamePage from './pages/GamePage';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GangwonEduSaeeum';
    src: url('/fonts/GangwonEduSaeeum.woff2') format('woff2'),
         url('/fonts/GangwonEduSaeeum.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Kyobo Handwriting 2025';
    src: url('/fonts/KyoboHandwriting2025lyb.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export default function App() {
  const [page, setPage] = useState('home');
  const [difficulty, setDifficulty] = useState(null);

  const goHome = useCallback(() => setPage('home'), []);

  const startGame = useCallback(() => setPage('difficulty'), []);

  const selectDifficulty = useCallback((diff) => {
    setDifficulty(diff);
    setPage('countdown');
  }, []);

  const onCountdownDone = useCallback(() => {
    setPage('game');
  }, []);

  const onGameOver = useCallback((score, time) => {
    // 게임 결과를 저장할 수 있음 (나중에)
    setPage('home');
  }, []);

  return (
    <>
      <GlobalStyle />
      {page === 'home'       && <HomePage onStart={startGame} />}
      {page === 'difficulty' && <DifficultyPage onSelect={selectDifficulty} onBack={goHome} />}
      {page === 'countdown'  && <CountdownPage key={difficulty} difficulty={difficulty} onDone={onCountdownDone} />}
      {page === 'game'       && <GamePage key={difficulty} difficulty={difficulty} onGameOver={onGameOver} />}
    </>
  );
}
