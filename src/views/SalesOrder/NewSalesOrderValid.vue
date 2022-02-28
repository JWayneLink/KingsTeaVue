

<template>
    <div id="app">
        <v-app>
            <v-container>
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

                <h1 class="mb-0" style="font-style: italic;color:#bf9000">Create your new customized order</h1>
                <div class="overline mb-4">innovation, quality, humble &amp; execution</div>
                <v-stepper v-model="curr" color="green">
                    <v-stepper-header class="overflow-x-auto">
                        <v-stepper-step 
                            v-for="(step,n) in steps"
                            :key="n"
                            :complete="stepComplete(n+1)"
                            :step="n+1"
                            :rules="[value => !!step.valid]" 
                            :color="stepStatus(n+1)">
                            {{ step.name }}
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-content v-for="(step,n) in steps" :step="n+1" :key="n">
                        {{ step.name }}
                        <v-card :color="color" class="mb-12" height="450px">                            
                            <v-card-text>
                                <!-- Select Customer Code -->
                                <v-form :ref="'stepForm'" v-if="n==0" v-model="step.valid" lazy-validation>
                                    <v-select
                                    v-model="selectedCustCode"
                                    :items="custCodes"
                                    v-on:change="custCodeOnChange"
                                    label="Choose Customer Code"
                                    ></v-select>
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-text-field readonly v-model="selectedCustTitle" label="Title">{{selectedCustTitle}}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field readonly v-model="selectedCustName" label="Name">{{selectedCustName}}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field readonly v-model="selectedCustPhone" label="Phone" prepend-inner-icon="mdi-phone">{{selectedCustPhone}}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field readonly v-model="selectedCustAddress" label="Address" prepend-inner-icon="mdi-map-marker">{{selectedCustAddress}}</v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>                                                                                                    
                                </v-form>    

                                <!-- Select Product Item -->
                                <v-form :ref="'stepForm'" v-if="n==1" v-model="step.valid" lazy-validation>
                                    <v-select
                                        v-model="selectedProductPn"
                                        :items="productPns"
                                        v-on:change="productPnOnChange"
                                        label="Choose Product Number"
                                    ></v-select>                                    
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" >
                                                <v-text-field readonly v-model="selectedProductName" label="Name">{{selectedProductName}}</v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" >
                                                <v-text-field readonly v-model="selectedProductCategory" label="Category">{{selectedProductCategory}}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6" >
                                                <v-text-field readonly v-model="selectedProductSize" label="Size">{{selectedProductSize}}</v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" >
                                                <v-text-field readonly v-model="selectedProductSugar" label="Sweeteners">{{selectedProductSugar}}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6" >
                                                <v-text-field readonly v-model="selectedProductIce" label="Ice">{{selectedProductIce}}</v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" >
                                                <v-text-field readonly v-model="selectedProductPrice" label="Price" prefix="$">{{selectedProductPrice}}</v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6"> 
                                                <v-text-field v-model="selectedProductQty" label="Qty" type="number">{{selectedProductPrice}}</v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="5">
                                                <v-alert dense text type="success" :value="addAlert" transition="fade-transition" >Thanks for adding <strong>hight-quality</strong> product. Enjoin your life.</v-alert>
                                            </v-col>
                                            <v-col cols="12" sm="1" >
                                               <v-btn @click="addProduct" class="mx-2" fab dark small color="teal" style="float:right;"><v-icon dark>mdi-cart-arrow-down</v-icon></v-btn>
                                            </v-col>                                          
                                        </v-row>
                                    </v-container>                                
                                </v-form>


                                <!-- Item Preview -->        
                                <v-form :ref="'stepForm'" v-if="n==2" v-model="step.valid" lazy-validation>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="12">
                                                <b-table @row-selected="onRowSelected" selectable :select-mode="selectMode" sticky-header striped hover :items="addedProductItem" :fields="fields"></b-table>                                                  
                                                <b-tfoot>
                                                    <b-tr>
                                                    <b-td variant="secondary" class="text-right">Total Rows: <b>{{previewTotalRows}}</b></b-td>                                                    
                                                    <b-td variant="secondary" class="text-right">Total Price: <b>{{previewTotalPrice}}</b></b-td>
                                                    </b-tr>
                                                </b-tfoot>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="12" >
                                                <v-btn @click="removeProduct" :disabled="toggleDisabled" class="mx-2" fab dark small color="pink" style="float:right;"><v-icon dark>mdi-cart-arrow-up</v-icon></v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>

                                <!-- Final View -->     
                                <v-form :ref="'stepForm'" v-if="n==3" v-model="step.valid" lazy-validation>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="12">
                                                <b-table sticky-header striped hover :items="addedProductItem" :fields="fields"></b-table>                                                  
                                                <b-tfoot>
                                                    <b-tr>
                                                    <b-td variant="secondary" class="text-right">Total Rows: <b>{{previewTotalRows}}</b></b-td>                                                    
                                                    <b-td variant="secondary" class="text-right">Total Price: <b>{{previewTotalPrice}}</b></b-td>
                                                    </b-tr>
                                                </b-tfoot>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>

                            </v-card-text>                           
                        </v-card>

                        <v-btn text @click="curr = n" :disabled="false">Back</v-btn>
                        <v-btn v-if="n+1 < lastStep" color="primary" @click="validate(n)" :disabled="valid" style="float:right;" >Continue</v-btn>
                        <v-btn v-else color="success" @click="done()" style="float:right;">Done</v-btn>
                    </v-stepper-content>
                </v-stepper>


                <v-row><v-col cols=".col-md-3 .offset-md-3"></v-col></v-row>
                <v-alert
                v-if="isStepsCompleted"
                outlined
                type="success"
                text
                >
                {{responseMsg}}
                </v-alert>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
// import Vuetifylib from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'
import ProductApi from "@/api/ProductApi.js";
import CustomerApi from '@/api/CustomerApi.js'
import SalesOrderApi from '@/api/SalesOrderApi.js'


Vue.use(Vuetify)
// Vue.use(Vuetifylib)

    export default {
        name: '',
        data(){
            return{
                curr: 1,
                lastStep: 4,
                steps: [
                    {name: "Customer", rules: [v => !!v || "Required."], valid: true},
                    {name: "Product", rules: [v=> !!v || "Required."], valid: true},
                    {name: "Order Preview", rules: [v=> !!v || "Required."], valid: true},
                    {name: "Complete"},
                ],
                valid: false,
                backDisabled: false,
                addAlert: false,
                dismissedCount: 0,
                stepForm: [],
                custCodes: [],                
                selectedCustCode:'',
                selectedCustTitle:'',
                selectedCustName:'',
                selectedCustPhone:'',
                selectedCustAddress:'',
                productPns:[],
                selectedProductPn:'',
                selectedProductName:'',
                selectedProductCategory:'',
                selectedProductSize:'',
                selectedProductSugar:'',
                selectedProductIce:'',
                selectedProductPrice:0,
                selectedProductQty: 1,
                color: colors.grey.lighten4,
                addedProductItem:[],
                fields: [                
                    { key: 'item'  },
                    { key: 'productName'  },
                    { key: 'productCategory'  },
                    { key: 'productPrice' },
                    { key: 'productQty' },
                    { key: 'productSubtotal' },
                ],
                previewItem:1,
                previewTotalRows:0,
                previewTotalPrice:0,
                selectMode: 'single',
                toggleDisabled: true,
                removedItem:0,
                dismissSecs: 3,
                dismissCountDownOK: 0,
                dismissCountDownNG: 0,
                responseMsg:'',
                isStepsCompleted: false,
            }
        },
        components:{},   
        created() {},     
        mounted(){

            // if(this.n==0)this.backDisabled = true;
            // else this.backDisabled = false;        
            
            this.getAllCustomerCode();
            this.getAllProductPn();            
        },             
        methods:{
            async getAllCustomerCode(){
                // QUERY ALL CUSTOMER
                this.custCodes = [];
                let results = await CustomerApi.get(`GetAllCustomersAsync`);      
                results.data.data.forEach((element) => {
                    this.selectedCustCode = element.custId;
                    this.selectedCustTitle = element.title;
                    this.selectedCustName = element.name;
                    this.selectedCustPhone = element.phone;
                    this.selectedCustAddress = element.address;                    
                    this.custCodes.push(this.selectedCustCode);
                });
            },
            async custCodeOnChange(){
                // QUERY SINGLE CUSTOMER
                 let results = await CustomerApi.get(`GetSingleCustomerAsync?custId=${this.selectedCustCode}`);  
                    results.data.data.forEach((element) => {
                    this.selectedCustCode = element.custId;
                    this.selectedCustTitle = element.title;
                    this.selectedCustName = element.name;
                    this.selectedCustPhone = element.phone;
                    this.selectedCustAddress = element.address;
                });
            },
            async getAllProductPn(){
                // QUERY ALL PRODUCT
                this.productPns = [];                
                let results = await ProductApi.get(`GetAllProductsAsync`);
                results.data.data.forEach((element) => {
                    
                    this.selectedProductPn = element.pn;
                    this.selectedProductName = element.name;
                    this.selectedProductCategory = element.category;
                    if(element.size == 'L') this.selectedProductSize = `${element.size} -  20 fl oz`; 
                    if(element.size == 'M') this.selectedProductSize = `${element.size} -  16 fl oz`; 
                    if(element.size == 'S') this.selectedProductSize = `${element.size} -  12 fl oz`;  
                    
                    switch (element.sugar) {
                    case '1':
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;
                        break;
                    case '2':
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;
                        break;
                    case '3':   
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;                    
                        break;
                    case '4':
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;                  
                        break;
                    case '5':      
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;                 
                        break;
                    default:
                        this.selectedProductSugar = `fixed Sugar`;
                    }
                    
                    this.selectedProductIce = element.ice;
                    this.selectedProductPrice = element.price;                    
                    this.productPns.push(element.pn);
                });
            },
            async productPnOnChange(){
                // QUERY SINGLE PRODUCT                                         
                let results = await ProductApi.get(`GetSingleProductAsync?pn=${this.selectedProductPn}`);
                results.data.data.forEach((element) => {
                    
                    this.selectedProductPn = element.pn;
                    this.selectedProductName = element.name;
                    this.selectedProductCategory = element.category;
                    if(element.size == 'L') this.selectedProductSize = `${element.size} -  20 fl oz`; 
                    if(element.size == 'M') this.selectedProductSize = `${element.size} -  16 fl oz`; 
                    if(element.size == 'S') this.selectedProductSize = `${element.size} -  12 fl oz`;  
                    
                    switch (element.sugar) {
                    case '1':
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;
                        break;
                    case '2':
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;
                        break;
                    case '3':   
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;                    
                        break;
                    case '4':
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;                  
                        break;
                    case '5':      
                        this.selectedProductSugar = `${element.sugar} packet (s) Sugar`;                 
                        break;
                    default:
                        this.selectedProductSugar = `fixed Sugar`;
                    }
                    
                    this.selectedProductIce = element.ice;
                    this.selectedProductPrice = element.price;    
                    this.selectedProductQty = 1;                                    
                });
            },
            async addSalesOrder(){

                debugger;
                let loginAccount = localStorage.getItem('account');
                let custId = this.selectedCustCode;
                let postArr = [];                
                this.addedProductItem.forEach(function(item) {
                    let postObj = {};
                    postObj.so = '';
                    postObj.custId = custId;
                    postObj.pn = item.productName;
                    postObj.qty = item.productQty;
                    postObj.status = 'S';
                    postObj.creator = loginAccount;
                    postArr.push(postObj);
                });  
                
                //POST NEW PRODUCT          
                SalesOrderApi.post(`AddSalesOrderBulkAsync`, postArr)
                .then( (response) => {
                    debugger;
                    if(response.data.isSuccess)
                    {
                        this.responseMsg = `Your Order: ${response.data.data[0]}`;      
                        this.isStepsCompleted = true;                  
                    }
                    else{
                        this.responseMsg = response.data.message;
                        this.showAlertNG();
                    }
                })
                .catch( (error) => {
                    debugger;
                    if(error.response.status == 422)
                    {
                        this.responseMsg = error.response.data[Object.keys(error.response.data)]
                        this.showAlertNG();
                    }
                });
            },
            addProduct(){
                this.valid = false;
                this.addAlert = true;
                this.dismissedCount = 5;                
                window.setInterval(() => {
                    if(this.dismissedCount > 0)
                    {
                        this.dismissedCount = this.dismissedCount -1;
                    }                              
                    if(this.dismissedCount == 0) this.addAlert = false;
                }, 1000);

                let addObj = {}
                addObj.item = this.previewItem++;
                addObj.productName = this.selectedProductName;
                addObj.productCategory = this.selectedProductCategory;
                addObj.productPrice = this.selectedProductPrice;
                addObj.productQty = this.selectedProductQty;
                addObj.productSubtotal = this.selectedProductPrice * this.selectedProductQty;
                this.addedProductItem.push(addObj);
                this.previewTotalRows = this.addedProductItem.length;

                this.previewTotalPrice = 0
                this.addedProductItem.forEach(element => {
                    this.previewTotalPrice += element.productSubtotal;
                });
            },
            removeProduct(){

                if(confirm("Do you really want to remove?"))    
                {                    
                    // remove by item
                    let removedIndex = this.removedItem;
                    let removedList = this.addedProductItem;
                    this.addedProductItem.forEach(function(item, index) {
                        if (item.item == removedIndex) {
                            removedList.splice(index, 1);
                        }
                    });                    
                    this.addedProductItem = removedList;
                    this.previewTotalRows = this.addedProductItem.length;
                    this.previewTotalPrice = 0
                    this.addedProductItem.forEach(element => {
                        this.previewTotalPrice += element.productSubtotal;
                    });
                } 
            },
            onRowSelected(items) {                
                // toggle enable update button
                if(items.length != 0)    
                {         
                    this.removedItem = items[0].item              
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
            stepComplete(step) {                
                return this.curr > step
            },
            stepStatus(step) {                
                return this.curr > step ? 'green' : 'blue'
            },
            validate(n) {
                
                this.steps[n].valid = false
                let v = this.$refs.stepForm[n].validate()
                if(n == 2 && this.addedProductItem.length == 0) v=false;
                if (v) {
                    this.steps[n].valid = true
                    // continue to next
                    this.curr = n+2
                }
            },
            done() {                
                this.curr = 5
                this.addSalesOrder();
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