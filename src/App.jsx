import React, { useState, useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';
import HomePage from './pages/HomePage';
import DifficultyPage from './pages/DifficultyPage';
import CountdownPage from './pages/CountdownPage';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GangwonEduSaeeum';
    src: url('/fonts/GangwonEduSaeeum.woff2') format('woff2'),
         url('/fonts/GangwonEduSaeeum.otf') format('opentype');
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
    setPage('difficulty');
  }, []);

  return (
    <>
      <GlobalStyle />
      {page === 'home'       && <HomePage onStart={startGame} />}
      {page === 'difficulty' && <DifficultyPage onSelect={selectDifficulty} onBack={goHome} />}
      {page === 'countdown'  && <CountdownPage key={difficulty} onDone={onCountdownDone} />}
    </>
  );
}
