<template>
<v-container>


<div v-for="(c,index) in items" :key="index">    
    <v-row  v-if="index == 0 || index % 3 == 0">
        <v-col cols="1"></v-col>
        <v-col v-if="index % 3 == 0"
        cols="3"
        sm="3">
            <v-card>
                <!-- <v-img
                :src="(`https://avatars.githubusercontent.com/u/${imgRandom}?v=4`)"
                height="200px"
                ></v-img> -->

                <img :src="(`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?v=4`)" class="circular--square">

                <v-card-title class="cyan darken-1">
                <span class="text-h5 white--text">{{items[index].name}}</span>

                <v-spacer></v-spacer>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-card-title>

                <v-list>
                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-widgets</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index].title}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index].name}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-phone</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index].phone}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index].address}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                </v-list>
            </v-card>
        </v-col>

        <v-col v-if="index + 1 < items.length"
        cols="3"
        sm="3">
            <v-card>
                <!-- <v-img
                :src="(`https://avatars.githubusercontent.com/u/${imgRandom}?v=4`)"
                height="200"
                ></v-img> -->

                <img :src="(`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?v=4`)" class="circular--square">

                <v-card-title class="cyan darken-1">
                <span class="text-h5 white--text">{{items[index+1].name}}</span>

                <v-spacer></v-spacer>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-card-title>

                <v-list>
                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-widgets</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+1].title}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+1].name}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-phone</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+1].phone}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+1].address}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>

            </v-card>
        </v-col>

        <v-col v-if="index + 2 < items.length"
        cols="3"
        sm="3">
            <v-card>

                <!-- <v-img
                :src="(`https://avatars.githubusercontent.com/u/${imgRandom}?v=4`)"
                height="200px"
                style="border-buttom-right-radius:50%"
                ></v-img> -->

                <img :src="(`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?v=4`)" class="circular--square">

                <v-card-title class="cyan darken-1">
                <span class="text-h5 white--text">{{items[index+2].name}}</span>

                <v-spacer></v-spacer>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                    dark
                    icon
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-card-title>

                <v-list>
                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-widgets</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+2].title}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-account</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+2].name}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                    <v-icon>mdi-message-text</v-icon>
                    </v-list-item-action>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-phone</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+2].phone}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-action>
                    <v-icon>mdi-map-marker</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                    <v-list-item-title>{{items[index+2].address}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>

            </v-card>
        </v-col>
        <v-col cols="1"></v-col>
    </v-row>    
</div>




</v-container>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAsios from 'vue-axios'
import CustomerApi from '@/api/CustomerApi.js'
Vue.use(VueAsios, axios)

export default({
    name: 'CustomerInfo',
    data() {
        return {
            items: [],
            customerList: [],
            imgRandom:0
        }
    },
    components:{
        
    },
    mounted(){
        this.queryAllCustomer();
        this.customerList = this.items;
        console.log(this.items)

        this.imgRandom = Math.floor(Math.random() * 1000);
    },
    methods:{
        async queryAllCustomer(){
            // QUERY ALL CUSTOMER
            this.items = [];
            let results = await CustomerApi.get(`GetAllCustomersAsync`);        
            results.data.data.forEach((element) => {
                let itemObj = {};
                itemObj.customerCode = element.custId;
                itemObj.name = element.name;
                itemObj.title = element.title;
                itemObj.address = element.address;
                itemObj.phone = element.phone;
                itemObj.udt = new Date(element.udt).toLocaleString();
                itemObj.cdt = new Date(element.cdt).toLocaleString();
                this.items.push(itemObj);
            });
        }
    }
})
</script>
<style scoped>
img{
    vertical-align: middle;
    width:150px;
    height:150px;
    display: inherit;
    margin:0 auto;
}
.circular--square {
    border-top-left-radius: 50% 50% !important;
    border-top-right-radius: 50% 50% !important;
    border-bottom-right-radius: 50% 50%;
    border-bottom-left-radius: 50% 50%;
}
</style>
