import React, { useState, useEffect } from 'react';
import './CountdownPage.css';

export default function CountdownPage({ onDone }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount(c => c - 1), 900);
    return () => clearTimeout(t);
  }, [count, onDone]);

  return (
    <div className="countdown-page">
      {/* Background PNG with white semi-transparent overlay (matches Figma) */}
      <img className="countdown-bg" src="/assets/bg-countdown.png" alt="" aria-hidden="true" />
      <div className="countdown-bg-overlay" aria-hidden="true" />

      {/* Title area */}
      <div className="countdown-title-wrap">
        <div className="countdown-title-ellipse" aria-hidden="true" />
        <img
          className="countdown-title-img"
          src="/assets/title-countdown.png"
          alt="준비하세요!"
        />
      </div>

      {/* Countdown number */}
      <div className={`countdown-number${count === 0 ? ' go' : ''}`} key={count}>
        {count === 0 ? 'GO!' : count}
      </div>
    </div>
  );
}
