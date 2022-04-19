<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <v-hover
        v-slot="{ hover }"
        open-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
            Open Delay (Mouse enter)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>

    <v-col
      cols="12"
      sm="6"
    >
      <v-hover
        v-slot="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
            Close Delay (Mouse leave)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>


<script>
// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

// Vue.use(Vuetify)

import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
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
  components,
  //directives,
        
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
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>