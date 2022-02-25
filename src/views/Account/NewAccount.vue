<template>
    <b-container>
        <h1>New Account View</h1>

        <b-row>
            <b-col></b-col>
            <b-col>
                <div class="vue-tempalte">
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

                    <form @submit.prevent>
                        <h3>Sign Up</h3>

                        <div class="form-group">
                            <label>Account</label>
                            <input type="text" v-model="account" class="form-control form-control-lg"/>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" v-model="password" class="form-control form-control-lg" />
                        </div>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text"  v-model="fullname" class="form-control form-control-lg"/>
                        </div>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" v-model="email" class="form-control form-control-lg" />
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" v-model="phonenumber" class="form-control form-control-lg" />
                        </div>

                        <button @click="signup" class="btn btn-dark btn-lg btn-block" style="float:right;">Sign Up</button>
                        <!-- <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button> -->
                        <p class="forgot-password text-right">
                            Already registered 
                            <router-link :to="{name: 'Login'}">sign in?</router-link>
                        </p>
                    </form>
                </div>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>


    // import store from '../../store/index'
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios, axios)

    export default {
        name: 'NewAccount',
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
        methods: {
            async signup() {
                // Authenticate against API
                event.preventDefault();
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