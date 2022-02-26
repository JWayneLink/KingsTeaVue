<template>
<b-container>
    <b-row style="height:36px;"></b-row>
    <b-row>
        <b-col></b-col>
        <b-col><h3 style="font-style: italic;color:#bf9000;" >{{ $t('CustomerPage.NewCustomer.title')}}</h3></b-col>
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

                        <validation-provider v-slot="{ errors }" name="CustomerCode" rules="required|max:10">
                            <v-text-field v-model="cusomercode" :counter="10" :error-messages="errors" label="Customer Code" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Name" rules="required|max:10">
                            <v-text-field v-model="name" :counter="10" :error-messages="errors" label="Name" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Title" rules="required|max:10">
                            <v-text-field v-model="title" :counter="10" :error-messages="errors" label="Title" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Address" rules="required|max:50">
                            <v-text-field v-model="address" :counter="50" :error-messages="errors" label="Address" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Phone" rules="required|max:20">
                            <v-text-field v-model="phone" :counter="20" :error-messages="errors" label="Phone" required>
                            </v-text-field>
                        </validation-provider>


                        <v-btn @click="clear">
                            Clear
                        </v-btn>
                        <v-btn class="mr-4" style="float:right;" type="submit" :disabled="invalid" >
                            New Customer
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
    import CustomerApi from '@/api/CustomerApi.js'
    import {required, max } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    setInteractionMode('eager')
    Vue.use(VueAxios, axios)
    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })

    export default {
        name: 'Customer',
        data() {
            return {
                cusomercode:'',
                name:'',
                title:'',
                address:'',
                phone:'',
                dismissSecs: 3,
                dismissCountDownOK: 0,
                dismissCountDownNG: 0,
                responseMsg : ''
            }
        },
        components:{
            ValidationObserver,
            ValidationProvider
        },
        methods:{
            submit() {
                this.$refs.observer.validate();

                //POST NEW PRODUCT          
                CustomerApi.post(`AddCustomerAsync`,{
                    custId: this.cusomercode,
                    name: this.name,
                    title: this.title,
                    address: this.address,
                    phone: this.phone,
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
                .catch( (error) => {
                    if(error.response.status == 422)
                    {
                        this.responseMsg = error.response.data[Object.keys(error.response.data)]
                        this.showAlertNG();
                    }
                });     
            },
            clear() {
                this.cusomercode = ''
                this.name = ''
                this.title = ''
                this.address = ''
                this.phone = ''                
                this.$refs.observer.reset()
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