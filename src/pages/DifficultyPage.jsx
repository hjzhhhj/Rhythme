import React from 'react';
import { DIFFICULTY_CONFIG } from '../utils/notes';
import { getRecords, formatTime } from '../utils/storage';
import './DifficultyPage.css';

const DIFFICULTIES = ['EASY', 'NORMAL', 'HARD', 'HELL'];

export default function DifficultyPage({ onSelect, onBack }) {
  const records = getRecords();

  return (
    <div className="diff-page">
      {/* Background PNG */}
      <img className="diff-bg" src="/assets/bg-difficulty.png" alt="" aria-hidden="true" />

      {/* Title area: transparent PNG overlay */}
      <div className="diff-title-wrap">
        <div className="diff-title-ellipse" aria-hidden="true" />
        <img
          className="diff-title-img"
          src="/assets/title-difficulty.png"
          alt="난이도를 선택하세요!"
        />
      </div>

      {/* Difficulty cards */}
      <div className="diff-cards">
        {DIFFICULTIES.map(diff => {
          const cfg = DIFFICULTY_CONFIG[diff];
          const best = records.best[diff];
          return (
            <button
              key={diff}
              className="diff-card"
              style={{ background: cfg.color }}
              onClick={() => onSelect(diff)}
            >
              <span className="diff-label">{cfg.label}</span>
              <span className="diff-icon">{cfg.icon}</span>
              {best != null && (
                <span className="diff-best">🏆 {formatTime(best)}</span>
              )}
            </button>
          );
        })}
      </div>

      <button className="diff-back" onClick={onBack}>← 돌아가기</button>
    </div>
  );
}
