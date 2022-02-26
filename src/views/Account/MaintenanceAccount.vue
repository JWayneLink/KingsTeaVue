<template>
    <b-container>
        <b-row style="height:36px;"></b-row>
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8"><b-col cols="8"><h3 style="font-style:italic;color:#bf9000;" >{{ $t('AccountPage.MaintenanceProduct.title')}}</h3></b-col></b-col>
            <b-col cols="2"></b-col>
        </b-row>
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8">
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


                    <!-- Account Query -->
                    <b-input-group prepend="Account ID" class="mt-3">
                    <b-form-input v-model="queryAccountId"></b-form-input>
                    <b-input-group-append>
                    <b-button @click="querySingleAccount" variant="outline-success">Query</b-button>
                    </b-input-group-append>
                    </b-input-group>
            </b-col>
            <b-col cols="2"></b-col>
        </b-row>
        <hr>

        <!-- Action Buttons -->
        <b-row cols="2">
            <b-col cols="2"></b-col>
            <b-col cols="5">
                 <b-button style="width:32%;" @click="clearSelected">Clear Selected</b-button>  
            </b-col>
            <b-col cols="1">
                <b-button  v-on:click.prevent="queryAccount" variant="outline-primary">Query</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="showUpdateModal" variant="outline-warning">Update</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="deleteCustomer" variant="outline-danger">Delete</b-button>                         
            </b-col>            
        </b-row> 


    </b-container>
</template>

<script>
export default {
    name:'MaintenanceAccount',
    data() {
        return{
            queryAccountId:'',
            dismissSecs: 3,
            dismissCountDownOK: 0,
            dismissCountDownNG: 0,
            responseMsg : '',
        }
    },
    mounted: function(){
        this.queryAllCustomer();
    },
    methods:{

    }
}
</script>