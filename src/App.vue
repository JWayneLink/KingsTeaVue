<template>
    <div id="app">
    <MainNavBar></MainNavBar>
  </div>
</template>

<script>
 import MainNavBar from './components/MainNavBar.vue'

  export default {
    name: 'App',

    components: {
      MainNavBar,
    },

    data: () => ({
      //
    }),
  };
</script>