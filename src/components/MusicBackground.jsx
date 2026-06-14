import React from 'react';
import styled, { keyframes } from 'styled-components';

const NOTES = ['♩', '♪', '♫', '♬', '𝄞', '♭', '♯', '★', '✦', '·'];
const COLORS = ['#fa94c0', '#99c5fc', '#95d5b4', '#bba4ee', '#ffda60', '#f9a8d4', '#86efac', '#93c5fd', '#c4b5fd'];

const POSITIONS = [
  { top: '5%',  left: '3%',  size: 28, color: 0, note: 1, delay: 0 },
  { top: '8%',  left: '12%', size: 22, color: 1, note: 0, delay: 0.5 },
  { top: '3%',  left: '22%', size: 18, color: 2, note: 4, delay: 1 },
  { top: '10%', left: '32%', size: 14, color: 3, note: 7, delay: 0.3 },
  { top: '5%',  left: '45%', size: 20, color: 0, note: 2, delay: 0.8 },
  { top: '8%',  left: '58%', size: 16, color: 4, note: 8, delay: 0.2 },
  { top: '4%',  left: '70%', size: 24, color: 1, note: 3, delay: 0.6 },
  { top: '7%',  left: '82%', size: 18, color: 2, note: 1, delay: 1.2 },
  { top: '3%',  left: '92%', size: 22, color: 5, note: 0, delay: 0.4 },
  { top: '18%', left: '1%',  size: 30, color: 3, note: 3, delay: 0.9 },
  { top: '25%', left: '6%',  size: 16, color: 0, note: 8, delay: 0.1 },
  { top: '35%', left: '2%',  size: 22, color: 6, note: 1, delay: 0.7 },
  { top: '45%', left: '5%',  size: 18, color: 1, note: 2, delay: 1.1 },
  { top: '55%', left: '1%',  size: 26, color: 4, note: 0, delay: 0.3 },
  { top: '65%', left: '4%',  size: 20, color: 2, note: 3, delay: 0.8 },
  { top: '75%', left: '2%',  size: 14, color: 7, note: 1, delay: 0.5 },
  { top: '85%', left: '6%',  size: 28, color: 0, note: 4, delay: 1.3 },
  { top: '92%', left: '3%',  size: 18, color: 3, note: 2, delay: 0.2 },
  { top: '18%', left: '95%', size: 22, color: 5, note: 1, delay: 0.6 },
  { top: '28%', left: '90%', size: 16, color: 1, note: 3, delay: 1.0 },
  { top: '38%', left: '96%', size: 24, color: 2, note: 0, delay: 0.4 },
  { top: '50%', left: '92%', size: 18, color: 6, note: 2, delay: 0.9 },
  { top: '60%', left: '97%', size: 20, color: 0, note: 1, delay: 0.1 },
  { top: '70%', left: '93%', size: 14, color: 4, note: 4, delay: 0.7 },
  { top: '80%', left: '96%', size: 26, color: 3, note: 3, delay: 1.2 },
  { top: '90%', left: '91%', size: 18, color: 7, note: 0, delay: 0.5 },
  { top: '88%', left: '20%', size: 22, color: 1, note: 2, delay: 0.3 },
  { top: '85%', left: '35%', size: 16, color: 2, note: 1, delay: 0.8 },
  { top: '90%', left: '50%', size: 28, color: 5, note: 3, delay: 0.6 },
  { top: '87%', left: '65%', size: 20, color: 0, note: 0, delay: 1.1 },
  { top: '92%', left: '78%', size: 14, color: 3, note: 4, delay: 0.2 },
  { top: '22%', left: '18%', size: 18, color: 6, note: 1, delay: 0.9 },
  { top: '15%', left: '75%', size: 22, color: 4, note: 2, delay: 0.4 },
  { top: '40%', left: '15%', size: 16, color: 2, note: 0, delay: 0.7 },
  { top: '60%', left: '12%', size: 24, color: 1, note: 3, delay: 1.0 },
  { top: '30%', left: '85%', size: 18, color: 7, note: 1, delay: 0.5 },
  { top: '48%', left: '88%', size: 14, color: 0, note: 2, delay: 0.3 },
];

const bgFloat = keyframes`
  0%   { transform: translateY(0px) rotate(-8deg); }
  100% { transform: translateY(-8px) rotate(8deg); }
`;

const BgWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Note = styled.span`
  position: absolute;
  user-select: none;
  animation: ${bgFloat} 3s ease-in-out infinite alternate;
  opacity: 0.85;
  font-family: 'Noto Sans KR', sans-serif;
`;

export default function MusicBackground() {
  return (
    <BgWrapper aria-hidden="true">
      {POSITIONS.map((p, i) => (
        <Note
          key={i}
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            color: COLORS[p.color % COLORS.length],
            animationDelay: `${p.delay}s`,
          }}
        >
          {NOTES[p.note % NOTES.length]}
        </Note>
      ))}
    </BgWrapper>
  );
}
