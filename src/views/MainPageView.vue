<template>
    <div class="container">
        <h1>Main Page View</h1>
        <!-- <slot name="switch">switch</slot> -->

    </div>
</template>

<script>
// Globally
//import Vue from 'vue';
// Vue.forceUpdate();
//import NavbarSwitch from '../components/NavbarSwitch.vue'
// Vue.use(NavbarSwitch)
export default {
    // inject:['reload'],
    name: 'MainPageView',
    beforeCreate(){
        //debugger;
        //this.$forceUpdate();  
            // window.setTimeout(( () => {
            //     //alert(123);
            // } ), 500);
    },
    created () {
        

        //this.$refs.foo.forceUpdate(); 
        //this.$forceUpdate();
        //this.reload();
        //const vm = this;
        // window.setTimeout( () => {
        //     console.log("refreshing vm..");
        //     NavbarSwitch.$forceUpdate();
        // }, 2000);
    },
    beforeMount(){  

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