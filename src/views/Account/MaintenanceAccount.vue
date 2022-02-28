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
                 <b-button style="width:32%;" variant="outline-secondary" @click="clearSelected">Clear Selected</b-button>  
            </b-col>
            <b-col cols="1">
                <b-button  v-on:click.prevent="queryAccount" variant="outline-primary">Query</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="showUpdateModal" variant="outline-warning">Update</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="deleteAccount" variant="outline-danger">Delete</b-button>                         
            </b-col>            
        </b-row> 

        <!-- Account Table -->
        <b-row>            
            <b-col cols="12">
                <b-table
                :items="items"
                :fields="fields"
                :select-mode="selectMode"                
                responsive="sm"
                striped
                hover
                selectable                  
                ref="selectableTable"      
                @row-selected="onRowSelected"
                ></b-table>    
            </b-col>            
        </b-row>  

        
        <!-- Update Modal Start -->
        <b-modal
            id="modal-center" 
            ref="modal"
            v-model="modalShow" 
            centered title="Update Account"    
            @ok="handleUpdate"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <!-- Disable Edit Customer Id -->
            <b-input-group prepend="Account" class="mb-2" >
                <b-form-input disabled v-model="selectedAccountId" aria-label="Account" trim ></b-form-input>
            </b-input-group>

            <!-- Name required valid message -->
            <b-form-group          
                label-for="name-input"
                invalid-feedback="Name is required"
                :state="nameState"
            >
                <b-input-group prepend="Name" :state="nameState" class="mb-2">
                    <b-form-input id="name-input" placeholder="Enter your name" v-model="updateName" :state="nameState" required aria-label="Name" trim></b-form-input>
                </b-input-group>
            </b-form-group >

            <!-- Email required valid message -->
            <b-form-group          
                label-for="email-input"
                invalid-feedback="Email is required"
                :state="emailState"
            >
                <b-input-group prepend="Email" :state="emailState" class="mb-2">
                    <b-form-input id="email-input" placeholder="Enter your email" v-model="updateEmail" :state="emailState" required aria-label="Email" trim></b-form-input>
                </b-input-group>
            </b-form-group>

            <!-- Phone required valid message -->
            <b-form-group          
                label-for="phone-input"
                invalid-feedback="Phone is required"
                :state="phoneState"
            >
                <b-input-group prepend="Phone" :state="phoneState" class="mb-2">
                    <b-form-input id="phone-input" placeholder="Enter your phone" v-model="updatePhone" :state="phoneState" required aria-label="Phone" trim></b-form-input>
                </b-input-group>
            </b-form-group>
        </form> 
        </b-modal>

    </b-container>
</template>

<script>
import AccountApi from "@/api/AccountApi.js";
export default {
    name:'MaintenanceAccount',
    data() {
        return{
            fields: [                
                { key: 'accountId'  },
                { key: 'name' },
                { key: 'email' },
                { key: 'phone' },
                { key: 'udt' },
                { key: 'cdt' }
            ],
            items: [],
            nameState: null, // null or false is invalid, true is valid
            emailState: null, // null or false is invalid, true is valid 
            phoneState: null, // null or false is invalide, true is valid                
            updateName:'',
            updateEmail:'',
            updatePhone:'',
            queryAccountId:'',
            toggleDisabled: true,
            modalShow: false,
            selectMode: 'single',
            selectedAccountId:'',
            selectedAccountName:'',
            selectedAccountEmail:'',
            selectedAccountPhone:'',
            dismissSecs: 3,
            dismissCountDownOK: 0,
            dismissCountDownNG: 0,
            responseMsg : '',
        }
    },
    mounted: function(){
        this.queryAllAccount();
    },
    methods:{
        async queryAllAccount(){
            // QUERY ALL ACCOUNT
            this.items = [];
            let results = await AccountApi.get(`GetAllAccountsAsync`);        
            results.data.data.forEach((element) => {

                let itemObj = {};
                itemObj.accountId = element.account;
                itemObj.name = element.name;
                itemObj.email = element.email;                
                itemObj.phone = element.phone;
                itemObj.udt = new Date(element.udt).toLocaleString();
                itemObj.cdt = new Date(element.cdt).toLocaleString();
                this.items.push(itemObj);
            });
        },
        async querySingleAccount(){
            if(this.queryAccountId == '')
            {
                this.responseMsg = 'Please input query Account Id';
                this.showAlertNG()
            }
            else
            {
                 // QUERY SINGLE          
                let results = await AccountApi.get(`GetSingleAccountAsync?account=${this.queryAccountId}`);
                this.items = [];
                if(results.data.isSuccess && results.data.data[0] != null)
                {
                    results.data.data.forEach((element) => {
                        let itemObj = {};
                        itemObj.accountId = element.account;
                        itemObj.name = element.name;
                        itemObj.email = element.email;
                        itemObj.phone = element.phone;                        
                        itemObj.udt = new Date(element.udt).toLocaleString();
                        itemObj.cdt = new Date(element.cdt).toLocaleString();
                        this.items.push(itemObj);
                    });
                    this.responseMsg = results.data.message;
                    this.showAlertOK();
                }
                else{
                    this.responseMsg = results.data.message;
                    this.showAlertNG();
                }
            }
        },
        updateAccount(){
            // PUT UPDATE          
            AccountApi.put(`UpdateAccountAsync`,{
                account: this.selectedAccountId,
                name: this.updateName,
                email: this.updateEmail,                
                phone: this.updatePhone,
            })
            .then( (response) => {
                if(response.data.isSuccess)
                {
                    this.responseMsg = response.data.message;
                    this.showAlertOK();
                    this.queryAllAccount();
                }
                else{
                    this.responseMsg = response.data.message;
                    this.showAlertNG();
                }
            })
            .catch( (error) => alert(error));  
        },
        deleteAccount(){

            if(this.selectedAccountId !=  '' && confirm("Do you really want to delete?"))    
            {                
                // DELETE
                AccountApi.delete(`DeleteAccountAsync?accountId=${this.selectedAccountId}`)
                .then( (response) => {
                    if(response.data.isSuccess)
                    {
                        this.responseMsg = response.data.message;
                        this.showAlertOK();
                        this.queryAllAccount();
                    }
                    else{
                        this.responseMsg = response.data.message;
                        this.showAlertNG();
                    }
                })
                .catch( (error) => alert(error));   
            }               
        },
        queryAccount(){
            this.queryAllAccount();
        },
        handleUpdate (bvModalEvt){
            
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            let validResult = this.handleSubmit();
            if(validResult)
            {
                this.updateAccount();
            }            
        },
        checkFormValidity() {
            const Valid = this.$refs.form.checkValidity()
            debugger;
            if (this.updateName == '')
            {
                this.nameState = Valid;                
                if( this.updateEmail == '') { this.emailState = Valid; }
                else { this.emailState = true; }

                if(this.updatePhone == '') { this.phoneState = Valid; }
                else { this.phoneState = true;}

                return Valid
            }
            else if (this.updateEmail == '')
            {
                this.emailState = Valid;  
                if(this.updateName == '') { this.nameState = Valid; }
                else { this.nameState = true; }            

                if(this.updatePhone == '') { this.phoneState = Valid; }
                else { this.phoneState = true;}
                
                return Valid
            }
            else if(this.updatePhone == '')
            {
                this.phoneState = Valid;
                if( this.updateName == '') { this.nameState = Valid; }
                else { this.nameState = true; }

                if( this.updateEmail == '') { this.emailState = Valid; }
                else { this.emailState = true; }

                return Valid
            }
            else
            {
                this.nameState = Valid;  
                this.emailState = Valid;                  
                this.phoneState = Valid;
                return Valid
            }      
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return false;
            }
            else{
                return true;
            }      
        },
        showUpdateModal(){
            this.modalShow = true;
        },
        onRowSelected(items) {
            // toggle enable update button
            if(items.length != 0)    
            {
                this.selectedAccountId = items[0].accountId
                this.updateName = items[0].name
                this.updateEmail = items[0].email                
                this.updatePhone = items[0].phone                       
                if(this.toggleDisabled)
                {
                    this.toggleDisabled = false;
                }          
            }   
            else
            {
                this.toggleDisabled = true;
            }                 
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected();
            this.queryCustCode = '';            
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
.input-group>.input-group-prepend {
    flex: 0 0 20%;
}
.input-group .input-group-text {
    width: 100%;
}
</style>