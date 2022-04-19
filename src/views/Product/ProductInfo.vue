<template>
  <div>
    <v-progress-linear
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      indeterminate
      color="green"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      indeterminate
      color="teal"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      indeterminate
      color="cyan"
    ></v-progress-linear>
  </div>


</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
export default({
    name: 'ProductInfo',
    data() {
        return {
            // loading: false,
            // selection: 1,
        }
    },
    components:{
        //VueTypeaheadBootstrap
        
    },
    mounted(){

    },
    methods:{
    //     reserve () {
    //         this.loading = true
    //         setTimeout(() => (this.loading = false), 2000)
    //   },
    }
})
</script>
