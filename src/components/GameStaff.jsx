import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { NOTE_DATA } from '../utils/notes';
import { getDisplayNotes } from '../utils/gameData';

const W = 1416;
const H = 360;
const STAFF_LEFT = 0;
const STAFF_RIGHT = 1416;
const STAFF_TOP = 86;
const LINE_GAP = 45;
const STEP_H = LINE_GAP / 2;
const STAFF_BOTTOM = STAFF_TOP + LINE_GAP * 4;
const CENTER_X = W / 2;
const BOX_W = 232;
const BOX_H = 278;
const BOX_Y = 36;
const NOTE_SPACING = 240;
const ACCIDENTAL_FONT = 'Inter, Arial, Helvetica, sans-serif';
const ACCIDENTAL_X_OFFSET = -44;
const ACCIDENTAL_Y_OFFSET = 11;

const COLORS = {
  staff: '#666666',
  outline: '#FA94C0',
  default: '#B83D70',
  correct: '#1C5CB1',
  wrong: '#8C6AD7',
};

const LINES = Array.from({ length: 5 }, (_, i) => STAFF_TOP + i * LINE_GAP);

function getNoteY(step) {
  return STAFF_BOTTOM - step * STEP_H;
}

function getOpacity(offset) {
  const distance = Math.abs(offset);
  if (distance === 2) return 0.4;
  if (distance === 1) return 0.7;
  return 1;
}

function getColor({ type, index, feedback, result }) {
  if (type === 'current' && feedback === 'correct') return COLORS.correct;
  if (type === 'current' && feedback === 'wrong') return COLORS.wrong;
  if (result === 'correct') return COLORS.correct;
  if (result === 'wrong') return COLORS.wrong;
  return COLORS.default;
}

const notePop = keyframes`
  0% { transform: scale(0.96); }
  55% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
`;

const StaffWrap = styled.div`
  width: min(1125px, 72vw, max(720px, calc((100dvh - 360px) * 3.933)));
  min-width: 0;
  max-width: 100%;
  aspect-ratio: ${W} / ${H};

  @media (max-height: 700px) {
    width: min(980px, 70vw, max(620px, calc((100dvh - 280px) * 3.933)));
  }

  @media (max-width: 720px) {
    width: min(calc(100vw - 32px), max(320px, calc((100dvh - 320px) * 3.933)));
  }
`;

const StaffSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const CurrentBox = styled.rect`
  fill: transparent;
  stroke: ${COLORS.outline};
  stroke-width: 8;
`;

const NoteGroup = styled.g`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transform-box: fill-box;
  transform-origin: center;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;

  ${({ $active, $feedback }) =>
    $active &&
    $feedback === 'correct' &&
    css`
      animation: ${notePop} 0.24s ease;
    `}

  ${({ $active, $feedback }) =>
    $active &&
    $feedback === 'wrong' &&
    css`
      animation: ${shake} 0.24s ease;
    `}
`;

function LedgerLines({ x, step, color, opacity }) {
  const ledgers = [];

  if (step <= -2) {
    for (let s = -2; s >= step; s -= 2) {
      ledgers.push(s);
    }
  }

  if (step >= 10) {
    for (let s = 10; s <= step; s += 2) {
      ledgers.push(s);
    }
  }

  return ledgers.map((s) => (
    <line
      key={s}
      x1={x - 42}
      y1={getNoteY(s)}
      x2={x + 42}
      y2={getNoteY(s)}
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={opacity}
    />
  ));
}

function NoteShape({ noteKey, x, color, opacity, active, feedback, onClick }) {
  const note = NOTE_DATA[noteKey];
  if (!note) return null;

  const y = getNoteY(note.staffStep);
  const stemUp = note.staffStep < 3;
  const stemX = stemUp ? x + 20 : x - 20;
  const stemEndY = stemUp ? y - 96 : y + 96;
  const label = `${note.name}${note.accidental || ''} 음 듣기`;

  const handleKeyDown = (event) => {
    if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    onClick(noteKey);
  };

  return (
    <NoteGroup
      $active={active}
      $feedback={feedback}
      $clickable={Boolean(onClick)}
      opacity={opacity}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? label : undefined}
      onClick={onClick ? () => onClick(noteKey) : undefined}
      onKeyDown={handleKeyDown}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <LedgerLines x={x} step={note.staffStep} color={color} opacity={1} />
      {note.accidental && (
        <text
          x={x + ACCIDENTAL_X_OFFSET}
          y={y + ACCIDENTAL_Y_OFFSET}
          textAnchor="middle"
          fontFamily={ACCIDENTAL_FONT}
          fontSize="58"
          fontWeight="400"
          fill={color}
          aria-hidden="true"
        >
          {note.accidental}
        </text>
      )}
      <ellipse
        cx={x}
        cy={y}
        rx="27"
        ry="19"
        fill={color}
        transform={`rotate(-18 ${x} ${y})`}
      />
      <line
        x1={stemX}
        y1={stemUp ? y - 4 : y + 4}
        x2={stemX}
        y2={stemEndY}
        stroke={color}
        strokeWidth="7"
        strokeLinecap="square"
      />
    </NoteGroup>
  );
}

export default function GameStaff({ sequence, currentIndex, feedback, results, onNoteClick }) {
  const displayNotes = getDisplayNotes(sequence, currentIndex);

  return (
    <StaffWrap>
      <StaffSvg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="오선지 음표 문제">
        {LINES.map((y) => (
          <line
            key={y}
            x1={STAFF_LEFT}
            y1={y}
            x2={STAFF_RIGHT}
            y2={y}
            stroke={COLORS.staff}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}

        <CurrentBox
          x={CENTER_X - BOX_W / 2}
          y={BOX_Y}
          width={BOX_W}
          height={BOX_H}
          rx="15"
          ry="15"
        />

        {displayNotes.map((item) => {
          const x = CENTER_X + item.offset * NOTE_SPACING;
          const active = item.offset === 0;
          const result = results[item.index];
          const color = getColor({ ...item, feedback, result });
          return (
            <NoteShape
              key={item.index}
              noteKey={item.key}
              x={x}
              color={color}
              opacity={getOpacity(item.offset)}
              active={active}
              feedback={feedback}
              onClick={onNoteClick}
            />
          );
        })}
      </StaffSvg>
    </StaffWrap>
  );
}
