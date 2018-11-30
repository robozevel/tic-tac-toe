<template>
  <main id="app">
    <div class="board" :class="{ disabled: ended }">
      <div
        v-for="(box, i) in board"
        :key="i"
        class="box"
        :class="[classes[box], `box-${i}`, winningMove && winningMove.includes(i) && 'strike']"
        @click="select(i)"
        role="button"></div>
    </div>
    <div>
      <span class="message">{{ message }}</span>
      <div v-if="ended" role="button" class="restart" @click="restart">play again</div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'TickTacToe',
  data () {
    return {
      turn: Math.random() > 0.5,
      classes: {
        true: 'x',
        false: 'o'
      },
      board: [],
      moves: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
    }
  },
  created () {
    this.restart()
  },
  computed: {
    winningMove () {
      return this.moves.find(moves => moves.every(i => this.board[i] === this.turn))
    },
    winner () {
      return this.winningMove ? this.turn : null
    },
    ended () {
      return this.winner !== null || this.board.every(box => box !== null)
    },
    message () {
      const player = this.turn ? '×' : '○'
      if (!this.ended) return `${player}'s turn`
      if (this.winner === null) return `it's a draw!`
      return `${player} is the winner!`
    }
  },
  methods: {
    select (i) {
      if (this.ended || this.board[i] !== null) return
      this.$set(this.board, i, this.turn)
      if (!this.ended) this.turn = !this.turn
    },
    restart () {
      this.board = new Array(9).fill(null)
    }
  }
}
</script>

<style>
main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

[role="button"] {
  user-select: none;
  cursor: pointer;
}

.board {
  display: inline-grid;
  grid: repeat(3, 100px) / repeat(3, 100px);
  font-weight: lighter;
  font-size: 100px;
  line-height: 100px;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 20px;
}

.board.disabled {
  pointer-events: none;
}

.box {
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box.strike {
  background-color: #f0f0f0;
}

.box.o::before {
  content: '\25cb'
}

.box.x::before {
  content: '\d7'
}

.box-1, .box-3, .box-4, .box-5, .box-7 {
  border: 3px solid #2c3e50;
}

.box-1, .box-7 {
  border-top: none;
}

.box-3, .box-5 {
  border-left: none;
}

.box-3, .box-5 {
  border-right: none;
}

.box-1, .box-7 {
  border-bottom: none;
}

.message {
  display: block;
}

.restart {
  display: inline-block;
  background: #f0f0f0;
  text-transform: uppercase;
  padding: .25em .5em;
  border-radius: .5em;
  margin-top: 1em;
}
</style>
