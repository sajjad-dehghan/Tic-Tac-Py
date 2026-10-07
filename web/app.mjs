import { outcome, computerMove, place } from './engine.mjs';
const $ = id => document.getElementById(id);
let board = Array(9).fill(null), turn = 'X', mode = 'computer', pending = null;
const cells = board.map((_, i) => {
  const button = document.createElement('button');
  button.className = 'tic-cell'; button.type = 'button';
  button.addEventListener('click', () => move(i));
  $('board').append(button); return button;
});
function render() {
  const result = outcome(board);
  cells.forEach((button, i) => {
    button.textContent = board[i] === 'X' ? '×' : board[i] === 'O' ? '○' : '';
    button.dataset.mark = board[i] || '';
    button.classList.toggle('winning', result.line.includes(i));
    button.disabled = Boolean(board[i] || result.winner || (mode === 'computer' && turn === 'O'));
    button.setAttribute('aria-label', `Row ${Math.floor(i / 3) + 1}, column ${i % 3 + 1}: ${board[i] || 'empty'}`);
  });
  const name = mark => mode === 'computer' ? (mark === 'X' ? 'You' : 'Computer') : `Player ${mark}`;
  $('x-player').querySelector('strong').textContent = name('X');
  $('o-player').querySelector('strong').textContent = name('O');
  $('x-player').classList.toggle('active', !result.winner && turn === 'X');
  $('o-player').classList.toggle('active', !result.winner && turn === 'O');
  $('status').textContent = result.winner === 'draw' ? 'A good match. It’s a draw.' : result.winner ? `${name(result.winner)} ${result.winner === 'X' && mode === 'computer' ? 'win' : 'wins'} this round!` : mode === 'computer' ? (turn === 'X' ? 'Your move. Make it a good one.' : 'Computer is thinking…') : `Player ${turn}, your move.`;
  $('computer').setAttribute('aria-pressed', String(mode === 'computer'));
  $('friend').setAttribute('aria-pressed', String(mode === 'friend'));
}
function move(index) {
  if (mode === 'computer' && turn === 'O') return;
  const next = place(board, index, turn); if (!next) return;
  board = next; turn = turn === 'X' ? 'O' : 'X'; render();
  if (mode === 'computer' && !outcome(board).winner) {
    pending = setTimeout(() => {
      const choice = computerMove(board);
      const reply = place(board, choice, 'O');
      if (reply) board = reply;
      turn = 'X'; pending = null; render();
    }, 350);
  }
}
function restart(nextMode = mode) { clearTimeout(pending); pending = null; mode = nextMode; board = Array(9).fill(null); turn = 'X'; render(); }
$('restart').addEventListener('click', () => restart());
$('computer').addEventListener('click', () => restart('computer'));
$('friend').addEventListener('click', () => restart('friend'));
render();
