<template>
  <div ref="app" class="pixi-app">

  </div>
</template>

<script>
import { Application, Assets } from 'pixi.js';

const pixiApp = new Application();

export default {
  methods: {
    async initPixiApp() {
      await pixiApp.init({ background: '#222222'});
      this.$refs.app.appendChild(pixiApp.canvas)
    }
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
