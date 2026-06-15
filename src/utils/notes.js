const BASE_KEYS = {
  C: 'A',
  D: 'S',
  E: 'D',
  F: 'F',
  G: 'G',
  A: 'H',
  B: 'J',
};

const SHARP_KEYS = {
  C: 'Q',
  D: 'W',
  E: 'E',
  F: 'R',
  G: 'T',
  A: 'Y',
  B: 'U',
};

const NOTE_NAMES = {
  C: '도',
  D: '레',
  E: '미',
  F: '파',
  G: '솔',
  A: '라',
  B: '시',
};

const NATURAL_NOTES = {
  C4: { name: NOTE_NAMES.C, key: BASE_KEYS.C, staffStep: -2, octave: 4, sound: 'C4' },
  D4: { name: NOTE_NAMES.D, key: BASE_KEYS.D, staffStep: -1, octave: 4, sound: 'D4' },
  E4: { name: NOTE_NAMES.E, key: BASE_KEYS.E, staffStep: 0, octave: 4, sound: 'E4' },
  F4: { name: NOTE_NAMES.F, key: BASE_KEYS.F, staffStep: 1, octave: 4, sound: 'F4' },
  G4: { name: NOTE_NAMES.G, key: BASE_KEYS.G, staffStep: 2, octave: 4, sound: 'G4' },
  A4: { name: NOTE_NAMES.A, key: BASE_KEYS.A, staffStep: 3, octave: 4, sound: 'A4' },
  B4: { name: NOTE_NAMES.B, key: BASE_KEYS.B, staffStep: 4, octave: 4, sound: 'B4' },
  C5: { name: NOTE_NAMES.C, key: BASE_KEYS.C, staffStep: 5, octave: 5, sound: 'C5' },
  D5: { name: NOTE_NAMES.D, key: BASE_KEYS.D, staffStep: 6, octave: 5, sound: 'D4' },
  E5: { name: NOTE_NAMES.E, key: BASE_KEYS.E, staffStep: 7, octave: 5, sound: 'E4' },
  F5: { name: NOTE_NAMES.F, key: BASE_KEYS.F, staffStep: 8, octave: 5, sound: 'F4' },
  G5: { name: NOTE_NAMES.G, key: BASE_KEYS.G, staffStep: 9, octave: 5, sound: 'G4' },
};

const ACCIDENTAL_NOTES = {
  C4_SHARP: { ...NATURAL_NOTES.C4, key: SHARP_KEYS.C, accidental: '♯', sound: 'C#4' },
  D4_SHARP: { ...NATURAL_NOTES.D4, key: SHARP_KEYS.D, accidental: '♯', sound: 'D#4' },
  E4_SHARP: { ...NATURAL_NOTES.E4, key: SHARP_KEYS.E, accidental: '♯', sound: 'F4' },
  F4_SHARP: { ...NATURAL_NOTES.F4, key: SHARP_KEYS.F, accidental: '♯', sound: 'F#4' },
  G4_SHARP: { ...NATURAL_NOTES.G4, key: SHARP_KEYS.G, accidental: '♯', sound: 'G#4' },
  A4_SHARP: { ...NATURAL_NOTES.A4, key: SHARP_KEYS.A, accidental: '♯', sound: 'A#4' },
  B4_SHARP: { ...NATURAL_NOTES.B4, key: SHARP_KEYS.B, accidental: '♯', sound: 'C5' },

  D4_FLAT: { ...NATURAL_NOTES.D4, accidental: '♭', sound: 'C#4' },
  E4_FLAT: { ...NATURAL_NOTES.E4, accidental: '♭', sound: 'D#4' },
  G4_FLAT: { ...NATURAL_NOTES.G4, accidental: '♭', sound: 'F#4' },
  A4_FLAT: { ...NATURAL_NOTES.A4, accidental: '♭', sound: 'G#4' },
  B4_FLAT: { ...NATURAL_NOTES.B4, accidental: '♭', sound: 'A#4' },

  C4_DOUBLE_SHARP: { ...NATURAL_NOTES.C4, key: SHARP_KEYS.C, accidental: '𝄪', sound: 'D4' },
  D4_DOUBLE_SHARP: { ...NATURAL_NOTES.D4, key: SHARP_KEYS.D, accidental: '𝄪', sound: 'E4' },
  F4_DOUBLE_SHARP: { ...NATURAL_NOTES.F4, key: SHARP_KEYS.F, accidental: '𝄪', sound: 'G4' },
  G4_DOUBLE_SHARP: { ...NATURAL_NOTES.G4, key: SHARP_KEYS.G, accidental: '𝄪', sound: 'A4' },
  A4_DOUBLE_SHARP: { ...NATURAL_NOTES.A4, key: SHARP_KEYS.A, accidental: '𝄪', sound: 'B4' },

  C4_NATURAL: { ...NATURAL_NOTES.C4, accidental: '♮' },
  D4_NATURAL: { ...NATURAL_NOTES.D4, accidental: '♮' },
  E4_NATURAL: { ...NATURAL_NOTES.E4, accidental: '♮' },
  F4_NATURAL: { ...NATURAL_NOTES.F4, accidental: '♮' },
  G4_NATURAL: { ...NATURAL_NOTES.G4, accidental: '♮' },
  A4_NATURAL: { ...NATURAL_NOTES.A4, accidental: '♮' },
  B4_NATURAL: { ...NATURAL_NOTES.B4, accidental: '♮' },
};

export const NOTE_DATA = {
  ...NATURAL_NOTES,
  ...ACCIDENTAL_NOTES,
};

const BASIC_NATURALS = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
const OCTAVE_NATURALS = [...BASIC_NATURALS, 'C5', 'D5', 'E5', 'F5', 'G5'];
const SHARPS = ['C4_SHARP', 'D4_SHARP', 'E4_SHARP', 'F4_SHARP', 'G4_SHARP', 'A4_SHARP', 'B4_SHARP'];
const FLATS = ['D4_FLAT', 'E4_FLAT', 'G4_FLAT', 'A4_FLAT', 'B4_FLAT'];
const DOUBLE_SHARPS = [
  'C4_DOUBLE_SHARP',
  'D4_DOUBLE_SHARP',
  'F4_DOUBLE_SHARP',
  'G4_DOUBLE_SHARP',
  'A4_DOUBLE_SHARP',
];
const NATURAL_SIGNS = [
  'C4_NATURAL',
  'D4_NATURAL',
  'E4_NATURAL',
  'F4_NATURAL',
  'G4_NATURAL',
  'A4_NATURAL',
  'B4_NATURAL',
];

export const DIFFICULTY_POOLS = {
  EASY: BASIC_NATURALS,
  NORMAL: OCTAVE_NATURALS,
  HARD: [...OCTAVE_NATURALS, ...SHARPS],
  HELL: [...OCTAVE_NATURALS, ...SHARPS, ...FLATS, ...DOUBLE_SHARPS, ...NATURAL_SIGNS],
};

export const DIFFICULTY_CONFIG = {
  EASY: { color: '#95d5b4', label: 'EASY', icon: '♩', textColor: '#fff' },
  NORMAL: { color: '#99c5fc', label: 'NORMAL', icon: '♩', textColor: '#fff' },
  HARD: { color: '#bba4ee', label: 'HARD', icon: '♩', textColor: '#fff' },
  HELL: { color: '#fa94c0', label: 'HELL', icon: '♩', textColor: '#fff' },
};

export const KEY_MAP = {
  a: '도',
  s: '레',
  d: '미',
  f: '파',
  g: '솔',
  h: '라',
  j: '시',
  q: '도#',
  w: '레#',
  e: '미#',
  r: '파#',
  t: '솔#',
  y: '라#',
  u: '시#',
};

export const KEYBOARD_HINTS = [
  { key: 'A', sharpKey: 'Q', note: '도' },
  { key: 'S', sharpKey: 'W', note: '레' },
  { key: 'D', sharpKey: 'E', note: '미' },
  { key: 'F', sharpKey: 'R', note: '파' },
  { key: 'G', sharpKey: 'T', note: '솔' },
  { key: 'H', sharpKey: 'Y', note: '라' },
  { key: 'J', sharpKey: 'U', note: '시' },
];

export const TOTAL_NOTES = 30;

export function generateNotes(difficulty) {
  const pool = DIFFICULTY_POOLS[difficulty] || DIFFICULTY_POOLS.NORMAL;
  const notes = [];
  let last = null;

  for (let i = 0; i < TOTAL_NOTES; i += 1) {
    let note;
    do {
      note = pool[Math.floor(Math.random() * pool.length)];
    } while (note === last && pool.length > 1);
    notes.push(note);
    last = note;
  }

  return notes;
}
