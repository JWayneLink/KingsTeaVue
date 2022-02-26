<template>
    <div id="app">
    <NavbarSwith></NavbarSwith>
  </div>
</template>

<script>
import NavbarSwith from './components/NavbarSwitch.vue'

  export default {
    name: 'App',
    data() {
      return {
      };
    },
    created () {
    },
    components:
    {
      NavbarSwith
    },
      beforeDestroy() {   
        window.removeEventListener("beforeunload", this.onUnload);
      },
    methods: {
      onUnload() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('account');        
      }
    }

    // data: () => ({
    //   //
    // }),
  };
</script>