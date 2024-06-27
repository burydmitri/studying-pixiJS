<template>
  <div ref="app" class="pixi-app">

  </div>

  <div class="buttons">
    <div @click="updateBombs" class="pixel">
      <p>Update</p>
    </div>
    <div @click="explodeAll" class="pixel">
      <p>Explode ALL!</p>
    </div>
  </div>
</template>

<script>
import { Application } from 'pixi.js';
import { createBomb } from './api';

const pixiApp = new Application();
let bombs = []

export default {
  methods: {
    explode(bomb) {
      bombs = bombs.filter(item => item != bomb)
      bomb.standAnim.destroy()
      bomb.expldAnim.play()
      pixiApp.stage.addChild(bomb.expldAnim);
    },
    explodeAll() {
      bombs.forEach(bomb => {
        bomb.standAnim.destroy()
        bomb.expldAnim.play()
        pixiApp.stage.addChild(bomb.expldAnim);
      })
      bombs = []
    },
    destroyAll() {
      bombs.forEach(bomb => {
        bomb.standAnim.destroy()
      })
      bombs = []
    },
    async createCanvas() {
      await pixiApp.init({ background: '#222222', width: 640, height: 250 });
      this.$refs.app.appendChild(pixiApp.canvas)
    },
    async displayBomb(type, x, y, standSpeed, explSpeed) {
      const bomb = await createBomb(type, x, y, standSpeed, explSpeed, () => this.explode(bomb))
      
      bombs.push(bomb)

      bomb.standAnim.play()
      pixiApp.stage.addChild(bomb.standAnim);
    },
    async displayBombs() {
      await this.displayBomb('red', pixiApp.screen.width / 2 - 40, pixiApp.screen.height / 2 - 15, 0.15, 0.2)
      await this.displayBomb('ice', pixiApp.screen.width / 2 + 40, pixiApp.screen.height / 2 - 15, 0.15, 0.2)
      await this.displayBomb('green', pixiApp.screen.width / 2 + 120, pixiApp.screen.height / 2 - 15, 0.06, 0.2)
      this.displayBomb('sound', pixiApp.screen.width / 2 - 120, pixiApp.screen.height / 2 - 15, 0.04, 0.2)
    },
    updateBombs() {
      this.destroyAll()
      this.displayBombs()
    },
    async initPixiApp() {
      await this.createCanvas()
      this.displayBombs()
    },
  },
  mounted() {
    this.initPixiApp()
  }
}
</script>

<style scoped>
.pixi-app {
  position: relative;
}
.pixi-app::before {
  content: '';

  display: block;
  width: 100px;
  height: 10px;
  background: var(--color-background);

  position: absolute;
  top: 0;
  right: 0;
}
.pixi-app::after {
  content: '';

  display: block;
  width: 100px;
  height: 10px;
  background: var(--color-background);

  position: absolute;
  bottom: 6px;
  left: 0;
}
.buttons {
  padding: 40px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
