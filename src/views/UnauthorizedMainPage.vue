<template>
<b-container>
    <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
            <div class="login">
            <!-- <SignupNavBar></SignupNavBar> -->
                <div class="form">
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
                    
                    <!-- Login -->
                    <h3 style="color:#bf9000;font-style: italic;">{{ $t('AccountPage.LoginTitle')}}</h3>
                    <div class="form-group">
                        <label>Account</label>
                        <input v-model="account" type="text" class="form-control form-control-lg" />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="password" type="password" class="form-control form-control-lg" />
                    </div>

                    <button @click="login" class="btn btn-dark btn-lg btn-block" >Sign in</button>
                    
                </div>
            </div>
        </b-col>
        <b-col cols="4"></b-col>
    </b-row>
    <b-row>
        <b-col cols="5"></b-col>
        <b-col cols="5">
            <p class=" mt-2 mb-4" style="padding:0.2rem 1rem;">
                <router-link to="/account/forgotpassword">Forgot password ?</router-link>
            </p>
        </b-col>
        <b-col cols="2"></b-col>
    </b-row>
</b-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AccountApi from "@/api/AccountApi.js";

    Vue.use(VueAxios, axios)
    export default {
        name: 'Login',        
        data() {
            return {
                account: '',
                password: '',
                dismissSecs: 3,
                dismissCountDownOK: 0,
                dismissCountDownNG: 0,
                responseMsg : ''               
            }
        },
        methods: {
            login() {
                // Authenticate against API
                if(this.account == '')
                {
                    this.responseMsg = 'Account can not be empty';
                    this.showAlertNG();
                }
                else if(this.password == '')
                {
                    this.responseMsg = 'Password can not be empty';
                    this.showAlertNG();
                }
                else
                {
                    //POST Login請求   
                    AccountApi.post(`AccountLoginAsync`,{
                        account: this.account,
                        pwd: this.password,
                    })
                    .then( (response) => {
                        if(response.data.isSuccess)
                        {
                            this.responseMsg = response.data.message;
                            this.showAlertOK();
                            localStorage.setItem('account', this.account); 
                            localStorage.setItem('access_token', 'true');            
                            this.$bus.$emit('logged', this.account);
                            this.$router.push(`/mainpage`);                                                   
                        }
                        else{
                            this.responseMsg = response.data.message;
                            this.showAlertNG();
                        }
                    })
                    .catch( (error) => {
                        if (error.response) {
                            // console.log(error.response.data)
                            // console.log(error.response.status)
                            // console.log(error.response.headers)
                        }
                    });
                }            
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
    .form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 0 auto;
        margin-top: 40px;
    }

    .form-group {
        padding: 10px;
        margin-bottom: 20px;
    }

    button {
        width: 50%;
        margin: 0 auto;
    }

    h3{
        text-align: center;
    }

    table,
    th,
    td {
        border: 1px solid black;
    }
</style>