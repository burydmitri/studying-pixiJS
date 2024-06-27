<template>
  <div ref="app" class="pixi-app">

  </div>
</template>

<script>
import { Application, Spritesheet, Texture, AnimatedSprite, Assets } from 'pixi.js';
import { createBomb } from './api';

const pixiApp = new Application();

export default {
  methods: {
    async createCanvas() {
      await pixiApp.init({ background: '#222222' });
      this.$refs.app.appendChild(pixiApp.canvas)
    },
    async displayBomb(x, y, standSpeed, explSpeed) {
      const bomb = await createBomb(x, y, standSpeed, explSpeed, () => {
        bomb.expldAnim.play()
        pixiApp.stage.addChild(bomb.expldAnim);
      })

      bomb.standAnim.play()
      pixiApp.stage.addChild(bomb.standAnim);
    },
    async initPixiApp() {
      await this.createCanvas()
      await this.displayBomb(pixiApp.screen.width / 2, pixiApp.screen.height / 2, 0.15, 0.2) 
    },
  },
  mounted() {
    this.initPixiApp()
  }
}
</script>

<style scoped>
.pixi-app {
  height: 600px;
}
</style>
