<template>
    <b-container>
        <b-row align-v="start" style="height:15px;">
            <b-col cols="5"></b-col>
            <b-col cols="5"></b-col>
        </b-row>
        <b-row>
            <b-col cols="5"></b-col>
            <b-col cols="5">
                <b-avatar src="https://placekitten.com/300/300"  size="10em"></b-avatar>                
                <h4 style="color:grey;"> Welcome! {{account}} </h4>   
            </b-col>
            <b-col></b-col>
        </b-row>
        <b-row>
            <b-col cols="3"></b-col>
            <b-col cols="6"><hr></b-col>            
            <b-col cols="3"></b-col>
        </b-row>

        <b-row>
            <b-col cols="4"></b-col>
            <b-col cols="4">
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
                
            <b-card-group deck>
                <b-card
                header="Name"
                header-tag="header"
                >
                    <input v-model="name" type="text" :disabled="disabled" class="form-control form-control-lg" />
                </b-card>
                <b-card
                header="E-mail"
                header-tag="header"
                >
                    <input v-model="email" type="text" :disabled="disabled" class="form-control form-control-lg" />
                </b-card>
                <b-card
                header="Phone"
                header-tag="header"
                >
                    <input v-model="phone" type="text" :disabled="disabled" class="form-control form-control-lg" />
                </b-card>

                <!-- function button -->
                <b-card>
                    <b-button @click.prevent="lockEdit" variant="outline-secondary">
                        <b-icon icon="lock" aria-hidden="true" v-if="disabled == true"></b-icon>
                        <b-icon icon="unlock" aria-hidden="true" v-else>></b-icon>
                        </b-button>
                    <b-button @click.prevent="confirmUpdate" :disabled="disabled" variant="outline-secondary" style="float:right;">Confirm Update</b-button>
                </b-card>
            </b-card-group>
            </b-col>            
            <b-col cols="4"></b-col>
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
    name:'AccountSetting',
    data(){
        return{
            account:'',
            disabled:true,
            lockState : 'LOCK',
            name:'',
            email:'',
            phone:'',
            dismissSecs: 3,
            dismissCountDownOK: 0,
            dismissCountDownNG: 0,
            responseMsg:''
        }
    },
    created() {
            
    },
    mounted: function() {     
        let loginAccount = localStorage.getItem('account')
        this.account = loginAccount;  
        this.getAccountInfo();
    },
    methods:{
        getAccountInfo(){
            if(this.account != '')
            {       
                AccountApi.get(`GetSingleAccountAsync?account=${this.account}`)
                .then( (response) => {
                    if(response.data.isSuccess)
                    {
                        this.name = response.data.data[0].name
                        this.email = response.data.data[0].email
                        this.phone = response.data.data[0].phone
                        this.responseMsg = response.data.message;                                                                            
                    }
                    else{
                        this.responseMsg = response.data.message;
                        this.showAlertNG();
                    }
                })
                .catch( (error) => {
                    if (error.response) {
                        console.log(error.response.data)
                    }
                });
            }
        },
        lockEdit(){
            
            if(this.disabled)
            {
                this.disabled = false;
                this.lockState = 'UNLOCK'
            }
            else{
                this.disabled = true;
                this.lockState = 'LOCK'
            }
        },
        confirmUpdate(){
            if(this.account != '')
            {
                AccountApi.put(`UpdateAccountAsync`,{
                account: this.account,
                name: this.name,
                email: this.email,
                phone: this.phone,
            })
            .then( (response) => {
                if(response.data.isSuccess)
                {
                    this.responseMsg = response.data.message;
                    this.showAlertOK();
                    this.disabled = true;
                }
                else{
                    this.responseMsg = response.data.message;
                    this.showAlertNG();
                }
            })
            .catch( (error) => alert(error));  
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