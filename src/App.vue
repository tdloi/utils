<template>
  <Header />
  <div class="wrapper">
    <DecimalHex />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DecimalHex from './components/DecimalHex.vue';
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    DecimalHex,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
fieldset {
  margin-bottom: 2rem;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
</style>
<style scoped>
.wrapper {
  margin: auto;
  margin-top: 2rem;
  max-width: 1024px;
}
</style>
