const KEY = 'rhythme_records';

export function getRecords() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { best: {}, recent: [] };
  } catch {
    return { best: {}, recent: [] };
  }
}

export function saveRecord({ difficulty, time, success, lives }) {
  const records = getRecords();

  if (success && time != null) {
    if (!records.best[difficulty] || time < records.best[difficulty]) {
      records.best[difficulty] = time;
    }
  }

  records.recent.unshift({
    difficulty,
    time,
    success,
    lives,
    date: new Date().toISOString(),
  });
  if (records.recent.length > 10) records.recent.length = 10;

  localStorage.setItem(KEY, JSON.stringify(records));
  return records;
}

export function formatTime(ms) {
  if (ms == null) return '--:--';
  const total = Math.floor(ms / 1000);
  const min = Math.floor(total / 60).toString().padStart(2, '0');
  const sec = (total % 60).toString().padStart(2, '0');
  const cent = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${min}:${sec}.${cent}`;
}
