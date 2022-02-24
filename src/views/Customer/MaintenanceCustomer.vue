<template>
    <div class="container">
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8"><b-col cols="8"><h3 style="font-style: italic;color:grey;" >{{ $t('')}}</h3></b-col></b-col>
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

                <!-- Customer Query -->
                <b-input-group prepend="Customer Code" class="mt-3">
                    <b-form-input v-model="queryCustCode"></b-form-input>
                    <b-input-group-append>
                    <b-button @click="querySingleCustomer" variant="outline-success">Query</b-button>
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
                <b-button  v-on:click.prevent="queryCustomer" variant="outline-primary">Query</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="showUpdateModal" variant="outline-warning">Update</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="deleteCustomer" variant="outline-danger">Delete</b-button>                         
            </b-col>            
        </b-row> 

        <!-- Product Table -->
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8">
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
            <b-col cols="2"></b-col>
        </b-row>  

<!-- Update Modal Start -->
<b-modal
    id="modal-center" 
    ref="modal"
    v-model="modalShow" 
    centered title="Update Customer"    
    @ok="handleUpdate"
>
<form ref="form" @submit.stop.prevent="handleSubmit">
    <!-- Disable Edit Customer Id -->
    <b-input-group prepend="CustId" class="mb-2" >
        <b-form-input disabled v-model="selectedCustId" aria-label="Pn" trim ></b-form-input>
    </b-input-group>

    <!-- Name required valid message -->
    <b-form-group          
        label-for="name-input"
        invalid-feedback="Name is required"
        :state="nameState"
    >
        <b-input-group prepend="Name" :state="nameState" class="mb-2">
            <b-form-input id="name-input" v-model="updateName" :state="nameState" required aria-label="Name" trim></b-form-input>
        </b-input-group>
    </b-form-group >

    <!-- Title required valid message -->
    <b-form-group          
        label-for="title-input"
        invalid-feedback="Title is required"
        :state="titleState"
    >
        <b-input-group prepend="Title" :state="titleState" class="mb-2">
            <b-form-input id="title-input"  v-model="updateTitle" :state="titleState" required aria-label="Title" trim></b-form-input>
        </b-input-group>
    </b-form-group>

    <!-- Address required valid message -->
    <b-form-group          
        label-for="address-input"
        invalid-feedback="Address is required"
        :state="addressState"
    >
        <b-input-group prepend="Address" :state="addressState" class="mb-2">
            <b-form-input id="address-input"  v-model="updateAddress" :state="addressState" required aria-label="Address" trim></b-form-input>
        </b-input-group>
    </b-form-group>

    <!-- Phone required valid message -->
    <b-form-group          
        label-for="phone-input"
        invalid-feedback="Phone is required"
        :state="phoneState"
    >
        <b-input-group prepend="Phone" :state="phoneState" class="mb-2">
            <b-form-input id="phone-input"  v-model="updatePhone" :state="phoneState" required aria-label="Phone" trim></b-form-input>
        </b-input-group>
    </b-form-group>


</form> 
</b-modal>

    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAsios from 'vue-axios'
Vue.use(VueAsios, axios)

export default {
    name:'MaintenanceCustomer',
    data(){
        return {
            fields: [                
                    { key: 'custId'  },
                    { key: 'name' },
                    { key: 'title' },
                    { key: 'address' },
                    { key: 'phone' },
                    { key: 'udt' },
                    { key: 'cdt' }
                ],
                items: [],
                nameState: null, // null or false is invalid, true is valid
                titleState: null, // null or false is invalid, true is valid 
                addressState: null, // null or false is invalide, true is valid
                phoneState: null, // null or false is invalide, true is valid
                updateName:'',
                updateTitle:'',
                updateAddress:'',
                updatePhone:'',
                toggleDisabled: true,
                modalShow: false,
                selectMode: 'single',
                selectedCustId : '',
                queryCustCode : '',
                dismissSecs: 3,
                dismissCountDownOK: 0,
                dismissCountDownNG: 0,
                responseMsg : '',      
        }
    },
    components:{

    },
    mounted: function(){
        this.queryAllCustomer();
    },
    methods:{
        async queryAllCustomer(){
            // QUERY ALL CUSTOMER
            this.items = [];
            let results = await axios.get(`${process.env.VUE_APP_KTA_CUSTOMER}GetAllCustomersAsync`);        
            results.data.data.forEach((element) => {
                let itemObj = {};
                itemObj.custId = element.custId;
                itemObj.name = element.name;
                itemObj.title = element.title;
                itemObj.address = element.address;
                itemObj.phone = element.phone;
                itemObj.udt = new Date(element.udt).toLocaleString();
                itemObj.cdt = new Date(element.cdt).toLocaleString();
                this.items.push(itemObj);
            });
        },
        async querySingleCustomer(){

            if(this.queryCustCode == '')
            {
                this.responseMsg = 'Please input query Customer Code';
                this.showAlertNG();
            }
            else
            {               
                // QUERY SINGLE          
                let results = await axios.get(`${process.env.VUE_APP_KTA_CUSTOMER}GetSingleCustomerAsync?custId=${this.queryCustCode}`);
                this.items = [];
                if(results.data.isSuccess && results.data.data[0] != null)
                {
                    results.data.data.forEach((element) => {
                        let itemObj = {};
                        itemObj.custId = element.custId;
                        itemObj.name = element.name;
                        itemObj.title = element.title;
                        itemObj.address = element.address;
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
        updateCustomer(){
            // PUT UPDATE          
            axios.put(`${process.env.VUE_APP_KTA_CUSTOMER}UpdateCustomerAsync`,{
                custId: this.selectedCustId,
                name: this.updateName,
                title: this.updateTitle,
                address: this.updateAddress,
                phone: this.updatePhone,
            })
            .then( (response) => {
                if(response.data.isSuccess)
                {
                    this.responseMsg = response.data.message;
                    this.showAlertOK();
                    this.queryAllCustomer();
                }
                else{
                    this.responseMsg = response.data.message;
                    this.showAlertNG();
                }
            })
            .catch( (error) => alert(error));  
        },
        deleteCustomer(){

            if(this.selectedCustId !=  '' && confirm("Do you really want to delete?"))    
            {                
                // DELETE
                axios.delete(`${process.env.VUE_APP_KTA_CUSTOMER}DeleteCustomerAsync?custId=${this.selectedCustId}`)
                .then( (response) => {
                    if(response.data.isSuccess)
                    {
                        this.responseMsg = response.data.message;
                        this.showAlertOK();
                        this.queryAllCustomer();
                    }
                    else{
                        this.responseMsg = response.data.message;
                        this.showAlertNG();
                    }
                })
                .catch( (error) => alert(error));   
            }               
        },
        queryCustomer(){
            this.queryAllCustomer();
        },
        handleUpdate (bvModalEvt){
            
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit();

            this.updateCustomer();           
        },
        checkFormValidity() {
            const Valid = this.$refs.form.checkValidity()
            if (this.updateName == '')
            {
                this.nameState = Valid;                
                if( this.updateTitle == '') { this.titleState = Valid; }
                else { this.titleState = true; }

                if(this.updateAddress == '') { this.addressState = Valid; }
                else { this.addressState = true;}

                if(this.updatePhone == '') { this.phoneState = Valid; }
                else { this.phoneState = true;}

                return Valid
            }
            else if (this.updateTitle == '')
            {
                this.titleState = Valid;  
                if(this.updateName == '') { this.nameState = Valid; }
                else { this.nameState = true; }
                
                if( this.updateAddress == '') { this.addressState = Valid; }
                else { this.addressState = true;}

                if(this.updatePhone == '') { this.phoneState = Valid; }
                else { this.phoneState = true;}
                
                return Valid
            }
            else if(this.updateAddress == '')
            {
                this.addressState = Valid;
                if( this.updateName == '') { this.nameState = Valid; }
                else { this.nameState = true; }

                if( this.updateTitle == '') { this.titleState = Valid; }
                else { this.titleState = true; }

                if(this.updatePhone == '') { this.phoneState = Valid; }
                else { this.phoneState = true;}

                return Valid
            }
            else if(this.updatePhone == '')
            {
                this.phoneState = Valid;
                if( this.updateName == '') { this.nameState = Valid; }
                else { this.nameState = true; }

                if( this.updateTitle == '') { this.titleState = Valid; }
                else { this.titleState = true; }

                if( this.updateAddress == '') { this.addressState = Valid; }
                else { this.addressState = true;}

                return Valid
            }
            else
            {
                this.nameState = Valid;  
                this.titleState = Valid;  
                this.addressState = Valid;  
                this.phoneState = Valid;
                return Valid
            }      
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            //this.submittedNames.push(this.name)
            // Hide the modal manually
            this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
            });
        },
        showUpdateModal(){
            this.modalShow = true;
        },
        onRowSelected(items) {
            // toggle enable update button
            if(items.length != 0)    
            {
                this.selectedCustId = items[0].custId
                this.updateName = items[0].name
                this.updateTitle = items[0].title
                this.updateAddress = items[0].address
                this.updatePhone = items[0].phone
                //alert(this.selectPn);
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