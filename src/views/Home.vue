<template>
  <div class="home">
    <top-menu></top-menu>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import TopMenu from '@/components/TopMenu.vue';

export default {
  name: 'home',
  components: {
    TopMenu,
  },
};
</script>
