<template>
    <b-container class="bv-example-row">
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

                        <validation-provider v-slot="{ errors }" name="Account" rules="required|max:10">
                            <v-text-field v-model="account" :counter="10" :error-messages="errors" label="Account" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Password" rules="required|max:10">
                            <v-text-field v-model="password" type="password" :counter="10" :error-messages="errors" label="Password" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Name" rules="required|max:10">
                            <v-text-field v-model="fullname" :counter="10" :error-messages="errors" label="Name" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                            <v-text-field v-model="email" :error-messages="errors" label="E-mail" required>
                            </v-text-field>
                        </validation-provider>

                        <validation-provider v-slot="{ errors }" name="Phone Number" :rules="{
                            required: true,
                            digits: 7,                            
                            }">
                            <v-text-field v-model="phonenumber" :counter="7" :error-messages="errors"
                                label="Phone Number" required></v-text-field>
                        </validation-provider>

                        <v-btn class="mr-4" type="submit" :disabled="invalid">
                            Sign Up
                        </v-btn>
                        <v-btn @click="clear" style="float:right;">
                            Clear
                        </v-btn>
                        <p class="forgot-password text-right">
                            Already registered 
                            <router-link :to="{name: 'Login'}">sign in?</router-link>
                        </p>
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
    Vue.use(VueAxios, axios)
    import {required, digits, email, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    setInteractionMode('eager')

    extend('digits', {
        ...digits,
        message: '{_field_} needs to be {length} digits. ({_value_})',
    })

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })

    extend('regex', {
        ...regex,
        message: '{_field_} {_value_} does not match {regex}',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    })

    export default {
        name: 'Account',
        data() {
            return {
                account: '',
                fullname: '',
                password: '',
                email: '',
                phonenumber: '',
                dismissSecs: 3,
                dismissCountDownOK: 0,
                dismissCountDownNG: 0,
                responseMsg : ''                   
            }
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        methods: {
            submit() {
                this.$refs.observer.validate();

                //POST請求            
                axios.post(`https://localhost:44356/v1/api/AppAccount/AddAccountAsync`,{
                    account: this.account,
                    name: this.fullname,
                    pwd: this.password,
                    email: this.email,
                    phone: this.phonenumber,
                })
                .then( (response) => {
                    if(response.data.isSuccess)
                    {
                        alert('OK');
                        this.responseMsg = response.data.message;
                        this.showAlertOK();
                    }
                    else{
                        alert('NG');
                        this.responseMsg = response.data.message;
                        this.showAlertNG();
                    }
                })
                .catch( (error) => alert(error));     
            },
            clear() {
                this.account = ''
                this.fullname = ''
                this.password = ''
                this.email = ''
                this.phonenumber = ''
                
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


<style scoped>

</style>