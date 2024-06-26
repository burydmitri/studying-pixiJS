<template>
  <div ref="app" class="pixi-app">

  </div>
</template>

<script>
import { Application, Spritesheet, Texture, AnimatedSprite, Assets } from 'pixi.js';
import { assetsFetch, hero } from './api';

const pixiApp = new Application();

export default {
  methods: {
    async initPixiApp() {
      await this.createCanvas()
      await assetsFetch()
      const anim = await hero()
      anim.animationSpeed = 0.025
      anim.x = pixiApp.screen.width / 2;
      anim.y = pixiApp.screen.height / 2;
      anim.play()
      pixiApp.stage.addChild(anim);
    },
    async createCanvas() {
      await pixiApp.init({ background: '#222222' });
      this.$refs.app.appendChild(pixiApp.canvas)
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
