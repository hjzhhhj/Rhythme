import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { NOTE_DATA } from '../utils/notes';

const W = 560;
const H = 240;
const STAFF_LEFT = 80;
const STAFF_RIGHT = 480;
const STAFF_BOTTOM = 180;
const STEP_H = 13;

const LINES = [0, 2, 4, 6, 8].map(s => STAFF_BOTTOM - s * STEP_H);

function getNoteY(step) {
  return STAFF_BOTTOM - step * STEP_H;
}

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-6px); }
  75%       { transform: translateX(6px); }
`;

const StaffSvg = styled.svg`
  display: block;
  transition: filter 0.15s;

  ${({ $feedback }) => $feedback === 'correct' && css`
    .note-head {
      filter: drop-shadow(0 0 8px #4CAF50);
    }
  `}

  ${({ $feedback }) => $feedback === 'wrong' && css`
    .note-head {
      filter: drop-shadow(0 0 8px #e53935);
      animation: ${shake} 0.3s ease;
    }
  `}
`;

export default function Staff({ noteKey, feedback }) {
  const note = noteKey ? NOTE_DATA[noteKey] : null;
  const noteX = W / 2 + 20;
  const noteY = note ? getNoteY(note.staffStep) : null;
  const stemUp = note ? note.staffStep < 4 : true;

  const noteColor =
    feedback === 'correct' ? '#4CAF50'
    : feedback === 'wrong'  ? '#e53935'
    : '#2d2d2d';

  return (
    <StaffSvg
      $feedback={feedback}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
    >
      {LINES.map((y, i) => (
        <line
          key={i}
          x1={STAFF_LEFT} y1={y}
          x2={STAFF_RIGHT} y2={y}
          stroke="#444" strokeWidth="2.2"
        />
      ))}

      <text
        x="55" y={STAFF_BOTTOM + 12}
        fontSize="130"
        fontFamily="'Kyobo Handwriting 2025', serif"
        fill="#555"
        style={{ userSelect: 'none' }}
      >
        𝄞
      </text>

      {note && (
        <>
          {note.ledger === 'below' && (
            <line
              x1={noteX - 22} y1={noteY}
              x2={noteX + 22} y2={noteY}
              stroke="#444" strokeWidth="2.2"
            />
          )}

          {note.staffStep > 8 && [9, 10].filter(s => s <= note.staffStep && s % 2 === 1 === false).map(s => (
            <line
              key={s}
              x1={noteX - 22} y1={getNoteY(s)}
              x2={noteX + 22} y2={getNoteY(s)}
              stroke="#444" strokeWidth="2.2"
            />
          ))}

          <ellipse
            cx={noteX}
            cy={noteY}
            rx={13}
            ry={9.5}
            fill={noteColor}
            transform={`rotate(-14, ${noteX}, ${noteY})`}
            className="note-head"
          />

          {stemUp ? (
            <line
              x1={noteX + 12} y1={noteY - 2}
              x2={noteX + 12} y2={noteY - 58}
              stroke={noteColor} strokeWidth="2.2"
            />
          ) : (
            <line
              x1={noteX - 12} y1={noteY + 2}
              x2={noteX - 12} y2={noteY + 58}
              stroke={noteColor} strokeWidth="2.2"
            />
          )}

          {note.octave === 5 && (
            <text
              x={noteX + 22}
              y={noteY - 6}
              fontSize="11"
              fontFamily="'Noto Sans KR', sans-serif"
              fill="#888"
            >
              5
            </text>
          )}
        </>
      )}
    </StaffSvg>
  );
}
