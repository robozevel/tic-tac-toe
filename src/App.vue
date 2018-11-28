<template>
  <main id="app">
    <div class="board">
      <div v-for="(box, i) in board" :key="i" class="box" :class="[classes[box], `box-${i}`]" @click="select(i)" role="button"></div>
    </div>
  </main>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'TickTacToe',
  data () {
    return {
      turn: false,
      classes: {
        true: 'x',
        false: 'o'
      },
      board: [
        null, null, null,
        null, null, null,
        null, null, null
      ]
    }
  },
  methods: {
    select (i) {
      if (this.board[i] !== null) return
      this.$set(this.board, i, this.turn)
      this.turn = !this.turn
    }
  }
  // components: {
  //   HelloWorld
  // }
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

.board {
  display: inline-grid;
  grid: repeat(3, 100px) / repeat(3, 100px);
  font-weight: lighter;
  font-size: 100px;
  line-height: 100px;
}

.box {
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
