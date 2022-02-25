<template>
    <b-container>      
        <b-row style="height:36px;"></b-row>
        <b-row>
            <b-col></b-col>
            <b-col><h3 style="font-style: italic;color:rgb(137, 30, 49);">{{ $t('ProductPage.NewProduct.title') }}</h3></b-col>
            <b-col></b-col>
        </b-row>
        <b-row>
            <b-col></b-col>
            <b-col>
                <validation-observer ref="observer" v-slot="{ invalid }">
                    <!-- Success Alert -->
                    <b-alert
                    :show="dismissCountDownOK"
                    dismissible
                    variant="success"
                    @dismissed="dismissCountDownOK=0"
                    @dismiss-count-down="countDownChangedOK"
                    >
                    {{ responseMsg }}
                    </b-alert>

                    <!-- Unsuccess Alert -->
                    <b-alert
                    :show="dismissCountDownNG"
                    dismissible
                    variant="danger"
                    @dismissed="dismissCountDownNG=0"
                    @dismiss-count-down="countDownChangedNG"
                    >
                    {{ responseMsg }}
                    </b-alert>

                    <form @submit.prevent="submit">

                        <validation-provider v-slot="{ errors }" name="pn" rules="required|max:10">
                            <v-text-field v-model="pn" :counter="10" :error-messages="errors" label="Product Number" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="name" rules="required|max:10">
                            <v-text-field v-model="name" :counter="10" :error-messages="errors" label="Name" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="category" rules="required|max:10">
                            <v-text-field v-model="category" :counter="10" :error-messages="errors" label="Category" required>
                            </v-text-field>
                        </validation-provider>

                        <label for="btn-radios-1" class="form-label" style="color:grey;">Size</label>
                        <b-input-group>
                        <b-form-radio-group
                            id="btn-radios-1"
                            v-model="size"                            
                            :options="sizeOptions"                            
                            size="lg"
                            name="radios-btn-default"
                            buttons
                        ></b-form-radio-group>  
                        </b-input-group>

                        <label for="rating-lg" class="mt-3" style="color:grey;" >Sugar</label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-button @click="resetSugar" variant="outline-secondary" >Reset</b-button>
                            </b-input-group-prepend>
                            <b-form-rating v-model="sugar" color="#a8a8a8"></b-form-rating>
                            <b-input-group-append>
                                <b-input-group-text class="justify-content-center" style="min-width: 3em;">
                                {{ sugar }}
                                </b-input-group-text>
                            </b-input-group-append>
                        </b-input-group>
                        
                        <label for="iceRange" class="form-label" style="color:grey;">Ice</label>
                        <b-input-group>
                            <input type="range" class="form-range" id="iceRange"  v-model="ice" min="0" max="5">
                        </b-input-group>

                        <validation-provider v-slot="{ errors }" name="price" rules="required|numeric">
                            <v-text-field v-model="price" :counter="10" :error-messages="errors" label="Price" required>
                            </v-text-field>
                        </validation-provider> 

                        <v-btn @click="clear">
                            Clear
                        </v-btn>
                        <v-btn class="mr-4" style="float:right;" type="submit" :disabled="invalid">
                            New Product
                        </v-btn>
                    </form>
                </validation-observer>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ProductApi from "@/api/ProductApi.js";
import {required, numeric, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue'
        // Install BootstrapVue
    Vue.use(BootstrapVue)
    Vue.use(VueAxios, axios)
    // Optionally install the BootstrapVue icon components plugin
    Vue.use(IconsPlugin)
    setInteractionMode('eager')

    extend('numeric', {
        ...numeric,
        message: '{_field_} needs to be numeric. ({_value_})',
    })

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    export default {
        name: '',
        data() {                 
            return {     
                pn: '',
                name: '',
                category: '',
                size: 'L',
                sugar: '0',
                ice: '',
                price: '',
                dismissSecs: 3,
                dismissCountDownOK: 0,
                dismissCountDownNG: 0,
                responseMsg : '',            
                sizeOptions: [
                    { text: '   L   ', value: 'L' },
                    { text: '   M  ', value: 'M' },                    
                    { text: '   S  ', value: 'S' }
                    ]   
            }
        },
        components:{
            ValidationObserver,
            ValidationProvider
        },
        methods:{
            submit() {
                this.$refs.observer.validate();

                //POST請求            
                ProductApi.post(`AddProductAsync`,{
                    pn: this.pn,
                    name: this.name,
                    category: this.category,
                    size: this.size,
                    sugar: this.sugar.toString(),
                    ice: this.ice.toString(),
                    price: this.price,
                })
                .then( (response) => {
                    if(response.data.isSuccess)
                    {
                        this.responseMsg = response.data.message;
                        this.showAlertOK();
                    }
                    else{
                        this.responseMsg = response.data.message;
                        this.showAlertNG();
                    }
                })
                .catch( (error) => alert(error));     
            },
            clear() {
                this.pn = ''
                this.name = ''
                this.category = ''
                this.size = 'L'
                this.sugar = 0
                this.ice = 0
                this.price = ''
                this.$refs.observer.reset()
            },
            resetSugar(){
                this.sugar = 0;
            },
            countDownChangedOK(dismissCountDownOK) {
                this.dismissCountDownOK = dismissCountDownOK
            },
            countDownChangedNG(dismissCountDownNG) {
                this.dismissCountDownNG = dismissCountDownNG
            },
            showAlertOK() {
                this.dismissCountDownOK = this.dismissSecs
            },
            showAlertNG() {
                this.dismissCountDownNG = this.dismissSecs
            }
        }
    }
</script>

<style>

</style>