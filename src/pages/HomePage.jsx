import React from 'react';
import './HomePage.css';

export default function HomePage({ onStart }) {
  return (
    <div className="home-page">
      {/* Figma background: scattered music notes */}
      <img
        className="home-bg"
        src="/assets/bg-home.png"
        alt=""
        aria-hidden="true"
      />

      {/* Center content area */}
      <div className="home-center">
        {/* Blurry white ellipse glow behind logo */}
        <div className="home-ellipse" aria-hidden="true" />

        {/* Rhythme logo PNG (transparent background) */}
        <img
          className="home-logo"
          src="/assets/logo-rhythme.png"
          alt="Rhythme"
        />
      </div>

      {/* Start button */}
      <button className="home-btn" onClick={onStart}>
        리듬타러가기 ♫
      </button>
    </div>
  );
}
