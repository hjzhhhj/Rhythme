import { DIFFICULTY_POOLS, TOTAL_NOTES } from './notes';

export function generateGameSequence(difficulty) {
  const pool = DIFFICULTY_POOLS[difficulty] || DIFFICULTY_POOLS.NORMAL;
  const sequence = [];
  let last = null;

  for (let i = 0; i < TOTAL_NOTES; i += 1) {
    let next;
    do {
      next = pool[Math.floor(Math.random() * pool.length)];
    } while (next === last && pool.length > 1);

    sequence.push(next);
    last = next;
  }

  return sequence;
}

export function getDisplayNotes(sequence, currentIndex) {
  return [-2, -1, 0, 1, 2]
    .map((offset) => {
      const index = currentIndex + offset;
      if (index < 0 || index >= sequence.length) return null;
      return {
        key: sequence[index],
        index,
        offset,
        type: offset < 0 ? 'past' : offset === 0 ? 'current' : 'next',
      };
    })
    .filter(Boolean);
}

export const NOTE_LABELS = {
  C4: '도',
  D4: '레',
  E4: '미',
  F4: '파',
  G4: '솔',
  A4: '라',
  B4: '시',
  C5: '도',
  D5: '레',
  E5: '미',
  F5: '파',
  G5: '솔',
};
