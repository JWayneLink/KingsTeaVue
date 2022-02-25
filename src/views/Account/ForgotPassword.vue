<template>
    <b-container>
        <!-- <b-row style="height:36px;"></b-row> -->
        <b-row>
            <b-col></b-col>
            <b-col>
                <div class="changepassword">
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
                        
                        <!-- Change New Password -->
                        <h3 style="font-style: italic;color:rgb(137, 30, 49);">{{ $t('AccountPage.ForgotPassowrd')}}</h3>
                        <div class="form-group">
                            <label>Account</label>
                            <input v-model="account" type="text" class="form-control form-control-lg" />
                        </div>

                        <div class="form-group">
                            <label>E-mail</label>
                            <input v-model="email" type="email" class="form-control form-control-lg" />
                        </div>

                        <button @click.prevent="confirm" class="btn btn-dark btn-lg btn-block">Confirm</button>                        
                    </div>
                </div>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            account:'',
            email:'',
            newpassword:'',
            dismissSecs: 3,
            dismissCountDownOK: 0,
            dismissCountDownNG: 0,
            responseMsg : '' 
        }
    },
    methods:{
        confirm(){
            alert(123);
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
