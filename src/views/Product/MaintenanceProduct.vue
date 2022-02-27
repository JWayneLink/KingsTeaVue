<template>
    <b-container>
        <b-row style="height:36px;"></b-row>
        <b-row>
            <b-col cols="2"></b-col>            
            <b-col cols="8"><h3 style="font-style: italic;color:#bf9000;" >{{ $t('ProductPage.MaintenanceProduct.title')}}</h3></b-col>
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

                <!-- Product Query -->
                <b-input-group prepend="Product" class="mt-3">
                    <b-form-input v-model="queryPn"></b-form-input>
                    <b-input-group-append>
                    <b-button @click="querySingleProduct" variant="outline-success">Query</b-button>
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
                <b-button  v-on:click.prevent="queryProduct" variant="outline-primary">Query</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="showUpdateModal" variant="outline-warning">Update</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="deleteProduct" variant="outline-danger">Delete</b-button>                         
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
    centered title="Update Product"    
    @ok="handleUpdate"
>
    <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Disable Edit Product Number -->
        <b-input-group prepend="Pn" class="mb-2" >
            <b-form-input disabled v-model="selectedPn" aria-label="Pn" trim ></b-form-input>
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

        <!-- Category required valid message -->
        <b-form-group          
          label-for="category-input"
          invalid-feedback="Category is required"
          :state="categoryState"
        >
            <b-input-group prepend="Category" :state="categoryState" class="mb-2">
                <b-form-input id="category-input"  v-model="updateCategory" :state="categoryState" required aria-label="Category" trim></b-form-input>
            </b-input-group>
        </b-form-group>

        <!-- Size update -->
            <b-input-group prepend="Size" class="mb-2">
                <b-form-radio-group
                id="btn-radios-1"
                v-model="updateSize"        
                :options="sizeOptions"  
                name="radios-btn-default"
                buttons
            ></b-form-radio-group>                          
        </b-input-group>

        <!-- Sugar update -->
        <b-input-group prepend="Sugar" class="mb-2">
                <b-form-rating v-model="updateSugar" color="#a8a8a8"></b-form-rating>
        </b-input-group>

        <!-- Ice update -->
        <b-input-group prepend="Ice" class="mb-2">
            <b-form-input id="iceRange" v-model="updateIce" type="range" min="0" max="5"></b-form-input>            
        </b-input-group>

        <!-- Price required valid message -->
        <b-form-group          
          label-for="price-input"
          invalid-feedback="Price is required"
          :state="priceState"
        >
            <b-input-group prepend="Price" :state="priceState" class="mb-2">
                <b-form-input id="price-input" v-model="updatePrice" :state="priceState" required aria-label="Price" trim></b-form-input>
            </b-input-group>
        </b-form-group>

    </form>                
</b-modal>
        <!-- Update Modal End -->


</b-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAsios from 'vue-axios'
import ProductApi from "@/api/ProductApi.js";
Vue.use(VueAsios, axios)

export default {
    name:'MaintenanceProduct',
    data() {
            return {
                // Note 'isActive' is left out and will not appear in the rendered table
                fields: [                
                    { key: 'productNumber'  },
                    { key: 'name' },
                    { key: 'category' },
                    { key: 'size' },
                    { key: 'sugar' },
                    { key: 'ice' },
                    { key: 'price', sortable: false },
                    { key: 'udt' },
                    { key: 'cdt' }
                ],
                items: [],
                nameState: null, // null or false is invalid, true is valid
                categoryState: null, // null or false is invalid, true is valid 
                priceState: null, // null or false is invalide, true is valid
                updateName:'',
                updateCategory:'',
                updateSize:'',
                updateSugar:'',
                updateIce:'',
                updatePrice:0,
                selectedPn: '',
                sizeOptions: [
                    { text: '   L   ', value: 'L' },
                    { text: '   M  ', value: 'M' },                    
                    { text: '   S  ', value: 'S' }
                ]  ,
                toggleDisabled: true,
                modalShow: false,
                selectMode: 'single',
                queryPn:'',
                dismissSecs: 3,
                dismissCountDownOK: 0,
                dismissCountDownNG: 0,
                responseMsg : '',                 
            }
        },
    components:{

    },
    mounted: function() {        
        this.queryAllProduct();
    },
    methods:{
        async queryAllProduct(){

            // QUERY ALL PRODUCT
            this.items = [];
            let results = await ProductApi.get(`GetAllProductsAsync`);
            results.data.data.forEach((element) => {
                let itemObj = {};
                itemObj.productNumber = element.pn;
                itemObj.name = element.name;
                itemObj.category = element.category;
                itemObj.size = element.size;
                itemObj.sugar = element.sugar;
                itemObj.ice = element.ice;
                itemObj.price = element.price;
                itemObj.udt = new Date(element.udt).toLocaleString();
                itemObj.cdt = new Date(element.cdt).toLocaleString();
                this.items.push(itemObj);
            });
        },
        async querySingleProduct(){

            if(this.queryPn == '')
            {
                this.responseMsg = 'Please input query Product Number';
                this.showAlertNG();
            }
            else
            {               
                // QUERY SINGLE          
                let results = await ProductApi.get(`GetSingleProductAsync?pn=${this.queryPn}`);
                this.items = [];
                if(results.data.isSuccess && results.data.data[0] != null)
                {
                    results.data.data.forEach((element) => {
                        let itemObj = {};
                        itemObj.productNumber = element.pn;
                        itemObj.name = element.name;
                        itemObj.category = element.category;
                        itemObj.size = element.size;
                        itemObj.sugar = element.sugar;
                        itemObj.ice = element.ice;
                        itemObj.price = element.price;
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
        updateProduct(){
            // PUT UPDATE                      
            ProductApi.put(`UpdateProductAsync`,{
                pn: this.selectedPn,
                name: this.updateName,
                category: this.updateCategory,
                size: this.updateSize,
                sugar: this.updateSugar.toString(),
                ice: this.updateIce.toString(),
                price: this.updatePrice,
            })
            .then( (response) => {
                if(response.data.isSuccess)
                {
                    this.responseMsg = response.data.message;
                    this.showAlertOK();
                    this.queryAllProduct();
                }
                else{
                    this.responseMsg = response.data.message;
                    this.showAlertNG();
                }
            })
            .catch( (error) => alert(error));  
        },
        deleteProduct(){

            if(this.selectedPn !=  '' && confirm("Do you really want to delete?"))    
            {
                // DELETE
                ProductApi.delete(`DeleteProductAsync?pn=${this.selectedPn}`)
                .then( (response) => {
                    if(response.data.isSuccess)
                    {
                        this.responseMsg = response.data.message;
                        this.showAlertOK();
                        this.queryAllProduct();
                    }
                    else{
                        this.responseMsg = response.data.message;
                        this.showAlertNG();
                    }
                })
                .catch( (error) => alert(error));   
            }               
        },
        queryProduct(){
            this.queryAllProduct();
        },
        handleUpdate (bvModalEvt){
            
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            let validResult = this.handleSubmit();            
            if(validResult)
            {
                this.updateProduct(); 
            }             
        },
        checkFormValidity() {
            
            const Valid = this.$refs.form.checkValidity()
            if (this.updateName == '')
            {
                this.nameState = Valid;                
                if(this.updateCategory == '') { this.categoryState = Valid; }
                else { this.categoryState = true; }

                if(this.updatePrice == 0) { this.priceState = Valid; }
                else { this.priceState = true;}

                return Valid
            }
            else if (this.updateCategory == '')
            {
                this.categoryState = Valid;  
                if(this.updateName == '') { this.nameState = Valid; }
                else { this.nameState = true; }
                
                if(this.updatePrice == 0) { this.priceState = Valid;}
                else{ this.priceState = true; }
                
                return Valid
            }
            else if(this.updatePrice == 0)
            {
                this.priceState = Valid;
                if (this.updateName == '') { this.nameState = Valid; }
                else { this.nameState = true; }

                if(this.updateCategory == '') { this.categoryState = Valid; }
                else{ this.categoryState = true; }

                return Valid
            }
            else
            {
                this.nameState = Valid;  
                this.categoryState = Valid;  
                this.priceState = Valid;  
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
                this.selectedPn = items[0].productNumber
                this.updateName = items[0].name
                this.updateCategory = items[0].category
                this.updateSize = items[0].size
                this.updateSugar = items[0].sugar
                this.updateIce = items[0].ice
                this.updatePrice = items[0].price                
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
            this.queryPn = '';            
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