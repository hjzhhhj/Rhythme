import React, { useState, useCallback } from 'react';
import HomePage from './pages/HomePage';
import DifficultyPage from './pages/DifficultyPage';
import CountdownPage from './pages/CountdownPage';

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
      {page === 'home'       && <HomePage onStart={startGame} />}
      {page === 'difficulty' && <DifficultyPage onSelect={selectDifficulty} onBack={goHome} />}
      {page === 'countdown'  && <CountdownPage key={difficulty} onDone={onCountdownDone} />}
    </>
  );
}
