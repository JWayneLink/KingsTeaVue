<template>    
<v-container>
        <b-row style="height:36px;"></b-row>
        <b-row>
            <b-col cols="2"></b-col>            
            <b-col cols="8"><h3 style="font-style: italic;color:#bf9000;" >{{ $t('SalesOrderPage.SalesOrderInformation.title') }}</h3></b-col>
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
                <b-input-group prepend="Sales Order Number" class="mt-3">
                    <!-- <b-form-input v-model="querySalesOrder"></b-form-input> -->
                    <vue-typeahead-bootstrap
                    :data="datasource"
                    v-model="querySalesOrder"
                    v-on:keyup="SearchAutoCompleate"
                    placeholder="Search Sales Order"
                    style="width:500px;"
                    />

                    <b-input-group-append>
                    <b-button @click="querySingleSalesOrder" variant="outline-success">Query</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col cols="2"></b-col>
        </b-row>     
        <hr>   
    <v-data-table
        :headers="headers"
        :items="items"
        item-key="so"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        show-expand        
    >
        <template v-slot:expanded-item="{ item }">     
            <td :colspan="headers.length">
                <b-table striped hover :items="item.details"></b-table>
            </td>
            <td :colspan="headers.length">
                <span style="font-weight:bold;color:red;font-style: italic;">$ {{item.totalPrice}}</span>
            </td>
        </template>
    </v-data-table>
  </v-container>
</template>


<script>
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import SalesOrderApi from '@/api/SalesOrderApi.js'

export default {
    name:'',
    data() {
        return {
            datasource:[],
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    text: "Sales Order",
                    sortable: true,
                    value: "so"
                },
                {
                    text: "Customer Name",
                    sortable: true,
                    value: "custName"
                },
                {
                    text: "Customer Title",
                    value: "custTitle"
                },
                {
                    text: "Customer Phone",
                    value: "custPhone"
                },
                {
                    text: "Customer Address",
                    value: "custAddress"
                },
                {
                    text: "Total Price",
                    sortable: true,
                    value: "totalPrice"
                },
                {
                    text: "Status",
                    sortable: true,
                    value: "status"
                },
                {
                    text: "Creator",
                    value: "creator"
                },
                {
                    text: "Udt",
                    sortable: true,
                    value: "udt"
                },
                {
                    text: "Cdt",
                    sortable: true,
                    value: "cdt"
                },
            ],
            items: [],
            querySalesOrder:'',
            totalPrice:0,                 
            dismissSecs: 3,
            dismissCountDownOK: 0,
            dismissCountDownNG: 0,
            responseMsg : '',  
        }
    },
    components:{
        VueTypeaheadBootstrap
    },    
    mounted(){      
        this.getAllSalesOrder()
    },  
    methods: {
        async getAllSalesOrder(){
            // QUERY ALL SALESORDER
            
            this.items = [];
            let itemsTmp = [];
            let results = await SalesOrderApi.get(`GetAllSalesOrdersDetailAsync`);  

            if(results.data.isSuccess)    
            {
                results.data.data.forEach((element) => {
                let item = {};
                item.so = element.so;
                item.custName = element.custName;
                item.custTitle = element.custTitle;
                item.custPhone = element.custPhone;
                item.custAddress = element.custAddress;
                item.totalPrice = element.totalPrice;
                item.status = element.status;
                item.creator = element.creator;
                item.udt = new Date(element.udt).toLocaleString();
                item.cdt = new Date(element.cdt).toLocaleString();
                item.details = []
                
                element.orderDetailDtos.forEach((d) =>{
                        let detial = {};
                        detial.productName = d.productName;
                        detial.productCategory = d.productCategory;

                        if(d.productSize == 'L') detial.productSize = `${d.productSize} -  20 fl oz`; 
                        if(d.productSize == 'M') detial.productSize = `${d.productSize} -  16 fl oz`; 
                        if(d.productSize == 'S') detial.productSize = `${d.productSize} -  12 fl oz`;  
                        
                        switch (d.productSugar) {
                        case '1':
                            detial.productSugar = `${d.productSugar} packet (s) Sugar`;
                            break;
                        case '2':
                            detial.productSugar = `${d.productSugar} packet (s) Sugar`;
                            break;
                        case '3':   
                            detial.productSugar = `${d.productSugar} packet (s) Sugar`;                    
                            break;
                        case '4':
                            detial.productSugar = `${d.productSugar} packet (s) Sugar`;                  
                            break;
                        case '5':      
                            detial.productSugar = `${d.productSugar} packet (s) Sugar`;                 
                            break;
                        default:
                            detial.productSugar = `fixed Sugar`;
                        }

                        detial.productIce = `${d.productIce} pcs`;
                        detial.productPrice = `$ ${d.productPrice}`;
                        detial.productQty = d.productQty;
                        detial.productSubTotal = `$ ${d.productSubTotal}`;

                        item.details.push(detial);                        
                    });
                    itemsTmp.push(item);
                });
                this.items = itemsTmp;
                this.responseMsg = results.data.message;
            }
            else{
                this.responseMsg = results.data.message;
                this.showAlertNG();
            }
            
        },
        async getSingleSalesOrder(so){
            // QUERY SINGLE SALESORDER
            this.items = [];
            let results = await SalesOrderApi.get(`GetAllSalesOrdersDetailBySoAsync?so=${so}`);      
            results.data.data.forEach((element) => {
                let item = {};
                item.so = element.so;
                item.custName = element.custName;
                item.custTitle = element.custTitle;
                item.custPhone = element.custPhone;
                item.custAddress = element.custAddress;
                item.totalPrice = element.totalPrice;
                item.status = element.status;
                item.creator = element.creator;
                item.udt = new Date(element.udt).toLocaleString();
                item.cdt = new Date(element.cdt).toLocaleString();
                item.details = []
                
                element.orderDetailDtos.forEach((d) =>{
                    let detial = {};
                    detial.productName = d.productName;
                    detial.productCategory = d.productCategory;

                    if(d.productSize == 'L') detial.productSize = `${d.productSize} -  20 fl oz`; 
                    if(d.productSize == 'M') detial.productSize = `${d.productSize} -  16 fl oz`; 
                    if(d.productSize == 'S') detial.productSize = `${d.productSize} -  12 fl oz`;  
                    
                    switch (d.productSugar) {
                    case '1':
                        detial.productSugar = `${d.productSugar} packet (s) Sugar`;
                        break;
                    case '2':
                        detial.productSugar = `${d.productSugar} packet (s) Sugar`;
                        break;
                    case '3':   
                        detial.productSugar = `${d.productSugar} packet (s) Sugar`;                    
                        break;
                    case '4':
                        detial.productSugar = `${d.productSugar} packet (s) Sugar`;                  
                        break;
                    case '5':      
                        detial.productSugar = `${d.productSugar} packet (s) Sugar`;                 
                        break;
                    default:
                        detial.productSugar = `fixed Sugar`;
                    }

                    detial.productIce = `${d.productIce} pcs`;
                    detial.productPrice = `$ ${d.productPrice}`;
                    detial.productQty = d.productQty;
                    detial.productSubTotal = `$ ${d.productSubTotal}`;

                    item.details.push(detial);                        
                });
                this.items.push(item);
            });
        },
        querySingleSalesOrder(){
            if(this.querySalesOrder == '')
            {
                this.getAllSalesOrder();
            }
            else{
                this.getSingleSalesOrder(this.querySalesOrder);            
                this.showAlertOK()
            }
        },
        SearchAutoCompleate : async function(){
        
            // key on event to query so number
            this.datasource = [];
            let results = await SalesOrderApi.get(`GetSalesOrderListAsync?so=${this.querySalesOrder}`);             
            let soComplete = [];
            results.data.data.forEach(element => {
                soComplete.push(element);
            });            
            this.datasource = soComplete;
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