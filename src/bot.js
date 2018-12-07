const MOVES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function findRandomMove (board, difficulty) {
  return [4, 0, 2, 6, 8, 1, 3, 5, 7]
    // shuffle using difficulty level
    .sort(() => Math.random() > difficulty ? 1 : -1)
    // get first free box
    .find(box => board[box] === null)
}

function findMove (board, player, count) {
  const toCount = (sum, box) => board[box] === player ? sum + 1 : sum
  for (let move of MOVES) {
    let score = move.reduce(toCount, 0)
    if (score !== count) continue
    let i = move.find(box => board[box] === null)
    if (i !== undefined) return i
  }
}

export function findNextMove (board, player, difficulty) {
  return [
    // winning move
    findMove(board, player, 2),
    // defensive move
    findMove(board, !player, 2),
    // random move
    findRandomMove(board, difficulty)
  ].find(i => i !== undefined)
}

export function findWinningMove(board, player) {
  return MOVES.find(moves => moves.every(i => board[i] === player))
}