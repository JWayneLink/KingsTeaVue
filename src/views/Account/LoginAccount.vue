<template>
    <div class="login">
        <div class="form">
            <!-- Login -->
            <h3>Log In</h3>

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
            
            <div class="form-group">
                <label>Account</label>
                <input v-model="account" type="text" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>

            <button @click="login" class="btn btn-dark btn-lg btn-block">Login</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios, axios)
    export default {
        name: 'Login',
        data() {
            return {
                account: '',
                password: '',                
            }
        },
        methods: {
            login() {
                // Authenticate against API

                // debugger;
                //POST請求            
                axios.post(`https://localhost:44356/v1/api/AppAccount/AccountLoginAsync`,{
                    account: this.account,
                    pwd: this.password,
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