import React from 'react';
import { NOTE_DATA } from '../utils/notes';
import './Staff.css';

const W = 560;
const H = 240;
const STAFF_LEFT = 80;
const STAFF_RIGHT = 480;
const STAFF_BOTTOM = 180; // y of line 1 (E4)
const STEP_H = 13;        // pixels per staff step

// Staff lines: steps 0, 2, 4, 6, 8 → E4, G4, B4, D5, F5
const LINES = [0, 2, 4, 6, 8].map(s => STAFF_BOTTOM - s * STEP_H);

function getNoteY(step) {
  return STAFF_BOTTOM - step * STEP_H;
}

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
    <svg
      className={`staff-svg${feedback ? ` staff-${feedback}` : ''}`}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
    >
      {/* Staff lines */}
      {LINES.map((y, i) => (
        <line
          key={i}
          x1={STAFF_LEFT} y1={y}
          x2={STAFF_RIGHT} y2={y}
          stroke="#444" strokeWidth="2.2"
        />
      ))}

      {/* Treble clef */}
      <text
        x="55" y={STAFF_BOTTOM + 12}
        fontSize="130"
        fontFamily="serif"
        fill="#555"
        style={{ userSelect: 'none' }}
      >
        𝄞
      </text>

      {note && (
        <>
          {/* Ledger line for C4 */}
          {note.ledger === 'below' && (
            <line
              x1={noteX - 22} y1={noteY}
              x2={noteX + 22} y2={noteY}
              stroke="#444" strokeWidth="2.2"
            />
          )}

          {/* Extra ledger lines if above staff (step > 8) */}
          {note.staffStep > 8 && [9, 10].filter(s => s <= note.staffStep && s % 2 === 1 === false).map(s => (
            <line
              key={s}
              x1={noteX - 22} y1={getNoteY(s)}
              x2={noteX + 22} y2={getNoteY(s)}
              stroke="#444" strokeWidth="2.2"
            />
          ))}

          {/* Note head */}
          <ellipse
            cx={noteX}
            cy={noteY}
            rx={13}
            ry={9.5}
            fill={noteColor}
            transform={`rotate(-14, ${noteX}, ${noteY})`}
            className="note-head"
          />

          {/* Stem */}
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

          {/* Octave indicator for 5th octave notes */}
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
    </svg>
  );
}
