<template>
<b-container>
    <b-row style="height:36px;"></b-row>
    <b-row>
        <b-col cols="2"></b-col>            
        <b-col cols="8"><h3 style="font-style: italic;color:#bf9000;" >{{ $t('SalesOrderPage.ReadOnlySalesOrder.title')}}</h3></b-col>
        <b-col cols="2"></b-col>
    </b-row>      
    <b-row>
        <b-col cols="2"></b-col>            
        <b-col cols="8"><h4 style="font-style: italic;color:#bf9000;">{{ $t('SalesOrderPage.ReadOnlySalesOrder.OrderNumber')}}: {{ this.$route.params.id }} </h4></b-col>
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
</b-container>

</template>

<script>

import SalesOrderApi from '@/api/SalesOrderApi.js'
export default {
    name:'',
    data() {
        return{
            expanded: [],
            singleExpand: true,
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
            totalPrice:0,  
        }
    },
    mounted(){      
        this.getSingleSalesOrder()
    }, 
    methods:{
        async getSingleSalesOrder(){
            // QUERY SINGLE SALESORDER
            this.items = [];
            let results = await SalesOrderApi.get(`GetAllSalesOrdersDetailBySoAsync?so=${this.$route.params.id}`);      
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
                    
                    switch (d.prodSugar) {
                    case '1':
                        detial.prodSugar = `${d.prodSugar} packet (s) Sugar`;
                        break;
                    case '2':
                        detial.prodSugar = `${d.prodSugar} packet (s) Sugar`;
                        break;
                    case '3':   
                        detial.prodSugar = `${d.prodSugar} packet (s) Sugar`;                    
                        break;
                    case '4':
                        detial.prodSugar = `${d.prodSugar} packet (s) Sugar`;                  
                        break;
                    case '5':      
                        detial.prodSugar = `${d.prodSugar} packet (s) Sugar`;                 
                        break;
                    default:
                        detial.prodSugar = `fixed Sugar`;
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
    }
}
</script>