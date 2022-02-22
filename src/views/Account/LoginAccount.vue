<template>
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
            <h3 style="font-style: italic;">Kings Tea Shop Sign In</h3>
            <div class="form-group">
                <label>Account</label>
                <input v-model="account" type="text" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>

            <button @click="login" class="btn btn-dark btn-lg btn-block">Sign in</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    // import SignupNavBar from '../../components/SignupNavBar.vue'

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
        // components:
        // {
        //     SignupNavBar
        // },
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
                    axios.post(`https://localhost:44356/v1/api/AppAccount/AccountLoginAsync`,{
                        account: this.account,
                        pwd: this.password,
                    })
                    .then( (response) => {
                        if(response.data.isSuccess)
                        {
                            debugger;
                            this.responseMsg = response.data.message;
                            this.showAlertOK();
                            // this.$localStorage.set('access_token', response.data.isSuccess);
                            localStorage.setItem('access_token', 'true');                
                            //this.$bus.$emit('logged', 'User logged');
                            this.$router.push(`/mainpage`);
                            //this.$forceUpdate();
                            //window.location.reload();
                            // let token = localStorage.getItem('access_token')
                            // alert('after login ' + token); //true
                            
                            // this.$forceUpdate();
                            // vm.$forceUpdate();
                            //window.location.reload();
                            
                        }
                        else{
                            this.responseMsg = response.data.message;
                            this.showAlertNG();
                        }
                    })
                    .catch( (error) => {
                        if (error.response) {
                            console.log(error.response.data)
                            console.log(error.response.status)
                            console.log(error.response.headers)
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