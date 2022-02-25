<template>
    <b-container>
        <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            :interval="4000"
            fade
            indicators
        >
            <b-carousel-slide
            caption="First slide"
            img-src="https://picsum.photos/1024/480/?image=26"
            ></b-carousel-slide>
            <b-carousel-slide
            caption="Second Slide"
            img-src="https://picsum.photos/1024/480/?image=9"
            ></b-carousel-slide>
            <b-carousel-slide
            caption="Third Slide"
            img-src="https://picsum.photos/1024/480/?image=22"
            ></b-carousel-slide>
            <b-carousel-slide
            caption="Fourth Slide"
            img-src="https://picsum.photos/1024/480/?image=12"
            ></b-carousel-slide>
        </b-carousel>


        <div class="mt-4">
            <h4>Left and Right (or Start and End)</h4>
            <b-card img-src="https://picsum.photos/300/300/?image=99" img-alt="Card image" img-left class="mb-3">
            <b-card-text>
                Some quick example text to build on the card and make up the bulk of the card's content.
            </b-card-text>
            </b-card>

            <b-card img-src="https://picsum.photos/300/300/?image=68" img-alt="Card image" img-right>
            <b-card-text>
                Some quick example text to build on the card and make up the bulk of the card's content.
            </b-card-text>
            </b-card>
        </div>
        <div class="mt-4">
            <h4>Left and Right (or Start and End)</h4>
            <b-card img-src="https://picsum.photos/300/300/?image=78" img-alt="Card image" img-left class="mb-3">
            <b-card-text>
                Some quick example text to build on the card and make up the bulk of the card's content.
            </b-card-text>
            </b-card>
        </div>
    </b-container>
</template>

<script>

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

</style>