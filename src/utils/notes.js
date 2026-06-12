// staffStep: position on treble clef staff
// 0 = E4 (bottom line), each step = half a line space (12px)
// Lines at steps 0, 2, 4, 6, 8 → E4, G4, B4, D5, F5
export const NOTE_DATA = {
  C4: { name: '도', key: 'S', staffStep: -2, octave: 4, ledger: 'below' },
  D4: { name: '레', key: 'D', staffStep: -1, octave: 4 },
  E4: { name: '미', key: 'F', staffStep: 0,  octave: 4 },
  F4: { name: '파', key: 'G', staffStep: 1,  octave: 4 },
  G4: { name: '솔', key: 'H', staffStep: 2,  octave: 4 },
  A4: { name: '라', key: 'J', staffStep: 3,  octave: 4 },
  B4: { name: '시', key: 'K', staffStep: 4,  octave: 4 },
  C5: { name: '도', key: 'S', staffStep: 5,  octave: 5 },
  D5: { name: '레', key: 'D', staffStep: 6,  octave: 5 },
  E5: { name: '미', key: 'F', staffStep: 7,  octave: 5 },
  F5: { name: '파', key: 'G', staffStep: 8,  octave: 5 },
  G5: { name: '솔', key: 'H', staffStep: 9,  octave: 5 },
};

export const DIFFICULTY_POOLS = {
  EASY:   ['C4', 'D4', 'E4', 'F4', 'G4'],
  NORMAL: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
  HARD:   ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'],
  HELL:   ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'],
};

export const DIFFICULTY_CONFIG = {
  EASY:   { color: '#95d5b4', label: 'EASY',   icon: '♩', textColor: '#fff' },
  NORMAL: { color: '#99c5fc', label: 'NORMAL', icon: '♪', textColor: '#fff' },
  HARD:   { color: '#bba4ee', label: 'HARD',   icon: '♬', textColor: '#fff' },
  HELL:   { color: '#fa94c0', label: 'HELL',   icon: '☻', textColor: '#fff' },
};

// Key (S~K) → note name mapping
export const KEY_MAP = {
  s: '도', d: '레', f: '미', g: '파', h: '솔', j: '라', k: '시',
};

// Note name → key letter
export const NOTE_TO_KEY = {
  '도': 'S', '레': 'D', '미': 'F', '파': 'G', '솔': 'H', '라': 'J', '시': 'K',
};

export const KEYBOARD_HINTS = [
  { key: 'S', note: '도' },
  { key: 'D', note: '레' },
  { key: 'F', note: '미' },
  { key: 'G', note: '파' },
  { key: 'H', note: '솔' },
  { key: 'J', note: '라' },
  { key: 'K', note: '시' },
];

export const TOTAL_NOTES = 30;

export function generateNotes(difficulty) {
  const pool = DIFFICULTY_POOLS[difficulty];
  const notes = [];
  let last = null;
  for (let i = 0; i < TOTAL_NOTES; i++) {
    let note;
    do {
      note = pool[Math.floor(Math.random() * pool.length)];
    } while (note === last && pool.length > 1);
    notes.push(note);
    last = note;
  }
  return notes;
}
