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
      <label>
        <input type="checkbox" v-model="autoplay" /> Play against bot
      </label>
      <select v-model="difficulty">
        <option v-for="(level, title) in levels" :value="level" :key="level">{{ title }}</option>
      </select>
    </div>
  </main>
</template>

<script>
export default {
  name: 'TickTacToe',
  data () {
    return {
      turn: Math.random() > 0.5,
      autoplay: true,
      board: new Array(9).fill(null),
      difficulty: 0.5,
      levels: {
        hard: 0.25,
        normal: 0.5,
        easy: 0.75
      },
      moves: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ],
      classes: {
        true: 'x',
        false: 'o'
      }
    }
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
      this.turn = false
    },
    findMove (player, count) {
      const toCount = (sum, box) => this.board[box] === player ? sum + 1 : sum
      for (let move of this.moves) {
        let score = move.reduce(toCount, 0)
        if (score !== count) continue
        let i = move.find(box => this.board[box] === null)
        if (i !== undefined) return i
      }
    },
    findRandomMove () {
      return [4, 0, 2, 6, 8, 1, 3, 5, 7]
        .sort(() => Math.random() > this.difficulty ? 1 : -1)
        .find(box => this.board[box] === null)
    },
    play () {
      this.select(this.findMove(this.turn, 2) || this.findMove(!this.turn, 2) || this.findRandomMove())
    }
  },
  watch: {
    turn: {
      immediate: true,
      handler (player) {
        if (this.autoplay && player) this.play()
      }
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
