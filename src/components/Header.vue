<template>
  <Menubar :model="items">
    <template #end>
      <a href="https://github.com/tdloi/utils"
        ><img src="/github.png" /><span>Github</span></a
      >
    </template></Menubar
  >
</template>

<script lang="ts">
interface IState {
  items: Array<string>;
}

export default {
  data(): IState {
    return {
      items: [],
    };
  },
};
</script>

<style scoped>
a {
  display: flex;
  align-items: center;
  margin-top: 0.35rem;
  margin-bottom: 0.35rem;
}
img {
  width: 25px;
  height: auto;
}
span {
  margin-left: 0.35rem;
  margin-right: 1rem;
}
</style>
