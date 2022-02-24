<template ref="foo">
    <div>
        <MainNavBar v-if="isLogged === 'true'"></MainNavBar>
        <SignupNavBar  v-if="isLogged === 'false'"></SignupNavBar>
    </div>
</template>

<script>
 import MainNavBar from '../components/MainNavBar.vue'
 import SignupNavBar from '../components/SignupNavBar.vue'

export default {
    naem:'NavbarSwitch',
    data() {
        return {
            isLogged: this.checkIfIsLogged(),            
        }
    },
    mounted()
    {
        this.isLogged = this.checkIfIsLogged();    
        this.$bus.$on('logged', () => {
            debugger;
            this.isLogged = this.checkIfIsLogged();
            this.forceUpdate();
        }); 
    },
    components:
    {
      MainNavBar,
      SignupNavBar
    },
    methods: {
      checkIfIsLogged () {          
          let token = localStorage.getItem('access_token')
          if (token == 'true') {
              return 'true'            
          } else {
              return 'false'
          }          
      },
      forceUpdate() {
        this.isLogged = this.checkIfIsLogged();
        this.$forceUpdate();
      }
    },
     beforeDestroy: function() {
    this.$bus.$off("logged");
  }
}
</script>
