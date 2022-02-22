<template>
    <div class="container">
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="8"><h3 style="font-style: italic;color:grey;" >{{ $t('ProductPage.QueryProduct.title')}}</h3></b-col>
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

                <!-- Using components -->
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

            <b-row cols="2">
            <b-col cols="2"></b-col>
            <b-col cols="5">
                 <b-button style="width:32%;"   @click="clearSelected">Clear Selected</b-button>  
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="updateProduct" variant="outline-warning">Update</b-button>                         
            </b-col>
            <b-col cols="1">
                <b-button :disabled="toggleDisabled" v-on:click.prevent="deleteProduct" variant="outline-danger">Delete</b-button>                         
            </b-col>
            <b-col cols="1"></b-col>
        </b-row> 
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
                <!-- <b-table responsive striped hover :items="items" :fields="fields"></b-table>                 -->
            </b-col>
            <b-col cols="2"></b-col>
        </b-row>  
        

    <b-modal id="modal-center" v-model="modalShow" centered title="Update Product">

        <b-input-group prepend="Pn" class="mb-2">
            <b-form-input disabled v-model="selectPn" aria-label="Pn" trim></b-form-input>
        </b-input-group>
            <b-input-group prepend="Name" class="mb-2">
            <b-form-input v-model="updateName" aria-label="Name" trim></b-form-input>
        </b-input-group>
            <b-input-group prepend="Category" class="mb-2">
            <b-form-input v-model="updateCategory" aria-label="Category" trim></b-form-input>
        </b-input-group>
            <b-input-group prepend="Size" class="mb-2">
                <b-form-radio-group
                id="btn-radios-1"
                v-model="updateSize"        
                :options="sizeOptions"  
                name="radios-btn-default"
                buttons
            ></b-form-radio-group>                          
        </b-input-group>

            <b-input-group prepend="Sugar" class="mb-2">
                <b-form-rating v-model="updateSugar" color="#a8a8a8"></b-form-rating>
            <!-- <b-form-input v-model="updateSugar" aria-label="Sugar" trim></b-form-input> -->
        </b-input-group>
            <b-input-group prepend="Ice" class="mb-2">
                <b-form-input id="iceRange" v-model="updateIce" type="range" min="0" max="5"></b-form-input>            
        </b-input-group>
            <b-input-group prepend="Price" class="mb-2">
            <b-form-input v-model="updatePrice" aria-label="Price" trim></b-form-input>
        </b-input-group>

                    <!-- <b-form-input
                    id="input-live"
                    v-model="name"
                    :state="nameState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Enter your name"
                    trim
                    ></b-form-input> -->
        </b-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAsios from 'vue-axios'
Vue.use(VueAsios, axios)

export default {
    name:'',
    data() {
            return {
                // Note 'isActive' is left out and will not appear in the rendered table
                fields: [                
                    { key: 'pn'  },
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
                updateName:'',
                updateCategory:'',
                updateSize:'',
                updateSugar:'',
                updateIce:'',
                updatePrice:0,
                selectPn: '',
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
            this.items = [];
            let results = await axios.get(`${process.env.VUE_APP_KTA_PRODUCT}GetAllProductsAsync`);
            results.data.data.forEach((element) => {
                let itemObj = {};
                itemObj.pn = element.pn;
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
                let results = await axios.get(`${process.env.VUE_APP_KTA_PRODUCT}GetSingleProductAsync?pn=${this.queryPn}`);
                this.items = [];
                if(results.data.isSuccess && results.data.data[0] != null)
                {
                    results.data.data.forEach((element) => {
                        let itemObj = {};
                        itemObj.pn = element.pn;
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
        async updateProduct(){
            this.modalShow = true;
        },
        deleteProduct(){

            if(this.selectPn !=  '' && confirm("Do you really want to delete?"))    
            {
                // DELETE
                axios.delete(`${process.env.VUE_APP_KTA_PRODUCT}DeleteProductAsync?pn=${this.selectPn}`)
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
        onRowSelected(items) {
            debugger;            
                 
            // toggle enable update button
            if(items.length != 0)    
            {
                this.selectPn = items[0].pn
                this.updateName = items[0].name
                this.updateCategory = items[0].category
                this.updateSize = items[0].size
                this.updateSugar = items[0].sugar
                this.updateIce = items[0].ice
                this.updatePrice = items[0].price
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
            this.queryPn = '';
            //this.queryAllProduct();
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