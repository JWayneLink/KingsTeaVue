<template>
    <b-container>
        <b-row style="height:60px;"></b-row>
        <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            :interval="3000"
            fade
            indicators
        >
            <b-carousel-slide
            :img-src="require('../assets/KingsTeaPictures/Banner/1.jpg')"
            ></b-carousel-slide>

            <b-carousel-slide
            :img-src="require('../assets/KingsTeaPictures/Banner/2.jpg')"
            ></b-carousel-slide>

            <b-carousel-slide
            :img-src="require('../assets/KingsTeaPictures/Banner/5.jpg')"
            ></b-carousel-slide>

            <b-carousel-slide
            :img-src="require('../assets/KingsTeaPictures/Banner/4.jpg')"
            ></b-carousel-slide>

        </b-carousel>


        <div class="mt-4">
            <b-card :img-src="require('../assets/KingsTeaPictures/Scene/Scene_1.jpg')" img-alt="Card image" img-left class="mb-3">
            <b-card-text style="font-weight: bold;color:grey;font-style:italic;">
                Earn more Stars and even more Rewards with a $430 intro annual fee for your first year with the KingsTea® Rewards Visa® Card. Plus your Stars won’t expire – an exclusive KingsTea benefit for cardmembers. Now that’s Super Starifying.
            </b-card-text>
            </b-card>

            <b-card :img-src="require('../assets/KingsTeaPictures/Scene/Scene_2.jpg')" img-alt="Card image" img-right style="height:450px;">
            <b-card-text style="font-weight: bold;color:grey;font-style:italic;">
                Go for the comforting flavors of a Pistachio Latte or the lively layers of an Iced Brown Sugar Oatmilk Shaken Espresso.
            </b-card-text>
            </b-card>
        </div>
        <div class="mt-4">
            <b-card :img-src="require('../assets/KingsTeaPictures/Scene/Scene_3.jpg')" img-alt="Card image" img-left class="mb-3">
            <b-card-text style="font-weight: bold;color:grey;font-style:italic;">
                Join us as KingsTea recognize the everyday Black excellence of our partners (employees). Explore ways to help cultivate the next generation of excellence.
            </b-card-text>
            </b-card>
        </div>


<v-row>
    <v-col
      v-for="n in 6"
      :key="n"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="require(`../assets/KingsTeaPictures/Product/單品圖_220225_${n}.jpg`)"
        :lazy-src="require(`../assets/KingsTeaPictures/Product/單品圖_220225_${n}.jpg`)"
        aspect-ratio="1"
        class="grey lighten-2"
      >     
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>

    </b-container>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
export default {
    name: 'MainPageView',
    data(){
        return {
            //loginUser:''
        }
    },
    beforeCreate(){

    },
    created () {
        
    },
    beforeMount(){  

    },
    mounted()
    {
    
    },
    components:
    {
        
    },
    methods:{

    }

}
</script>

<style>

/* .Center {
    width:200px;
    height:200px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
} */

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
}

.v-application--wrap {
    min-height: 100vh;
    justify-content: center;
}
</style>