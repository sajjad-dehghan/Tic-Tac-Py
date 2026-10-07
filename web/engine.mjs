// Browser port of src/main.py: win, block, corners, center, edges.
export const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function outcome(board) {
  const line = lines.find(cells => board[cells[0]] && cells.every(i => board[i] === board[cells[0]]));
  return line ? { winner: board[line[0]], line } : { winner: board.every(Boolean) ? 'draw' : null, line: [] };
}
export function computerMove(board) {
  if (outcome(board).winner) return -1;
  for (const mark of ['O', 'X']) {
    for (let i = 0; i < 9; i++) {
      if (board[i]) continue;
      const trial = [...board]; trial[i] = mark;
      if (outcome(trial).winner === mark) return i;
    }
  }
  return [0,2,6,8,4,1,3,5,7].find(i => !board[i]) ?? -1;
}
export function place(board, index, mark) {
  if (!Number.isInteger(index) || index < 0 || index > 8 || board[index] || outcome(board).winner || !['X','O'].includes(mark)) return null;
  const next = [...board]; next[index] = mark; return next;
}
