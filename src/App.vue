<template>
    <div id="app">
    <!-- <MainNavBar v-if="isLogged === 'true'"></MainNavBar>
    <SignupNavBar  v-if="isLogged === 'false'"></SignupNavBar> -->

    <NavbarSwith></NavbarSwith>
  </div>
</template>

<script>
//  import MainNavBar from './components/MainNavBar.vue'
//  import SignupNavBar from './components/SignupNavBar.vue'
import NavbarSwith from './components/NavbarSwitch.vue'

  export default {
    name: 'App',
    data() {
      return {
        // renderComponent: true,
        // isLogged: this.checkIfIsLogged()
      };
    },
    created () {
      //this.isLogged = this.checkIfIsLogged();
    },
    components:
    {
      NavbarSwith
      // MainNavBar,
      // SignupNavBar
    },
    methods: {
      // checkIfIsLogged () {
      //     let token = localStorage.getItem('access_token')
      //     if (token == 'true') {
      //         return 'true'            
      //     } else {
      //         return 'false'
      //     }          
      // }
    }

    // data: () => ({
    //   //
    // }),
  };
</script>