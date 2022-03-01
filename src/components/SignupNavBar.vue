<template>

<div id="app1">
        <b-navbar type="dark" variant="secondary " >
            <b-navbar-nav>   
                <vue-typeahead-bootstrap
                :data="datasource"
                v-model="querySalesOrder"
                v-on:keyup="SearchAutoCompleate"
                placeholder="Search Sales Order"
                style="margin-left:20px;"
                />             
                <!-- <b-form-input v-model="querySalesOrder" size="sm" class="mr-sm-2" placeholder="Search Sales Order" style="margin-left:20px;"></b-form-input>                 -->
            </b-navbar-nav>
            <b-navbar-nav> 
                <b-nav-item>
                    <b-button @click.prevent="search" variant="outline-success" >{{ $t('SignupBar.Search') }}</b-button>
                </b-nav-item>
            </b-navbar-nav> 
            <b-navbar-nav  class="ms-auto">
                <b-nav-item>
                    <b-button @click.prevent="signIp" variant="outline-light" >{{ $t('SignupBar.SignIn') }}</b-button>
                    <!-- <router-link to="/account/login"> {{ $t('SignupBar.SignIn') }} </router-link> -->
                </b-nav-item>
                <b-nav-item>
                    <b-button @click.prevent="signUp" variant="outline-dark" >{{ $t('SignupBar.SignUn') }}</b-button>
                    <!-- <router-link to="/account/new"> {{ $t('SignupBar.SignUn') }} </router-link> -->
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <router-view />
    </div>


</template>

<script>
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import SalesOrderApi from '@/api/SalesOrderApi.js'
import Vue from 'vue'
import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue'

    // Install BootstrapVue
    Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
    Vue.use(IconsPlugin)

    export default {
        name: 'MainNavBar',
        data() {
            return {
                datasource:[],
                isLogged: 'false',
                querySalesOrder:''
            }
        },
        components:{
            VueTypeaheadBootstrap
        },  
        mounted () {

        },
        methods: {
            signIp: function() {            
                this.$router.push(`/account/login`);       
            },
            signUp: function() {            
                this.$router.push(`/account/new`);         
            },
            changelanguage: function (event) {
                let lang = event.target.getAttribute('data-lang');

                debugger;
                lang = lang.toLowerCase();
                switch (lang) {
                    case '英文':
                        lang = 'en';
                        break;
                    case '中文':
                        lang = 'zh';
                        break;
                    case '日文':
                        lang = 'ja';
                        break;
                    default:
                        // code block
                }

                //將所選語系代碼存入store中
                this.$store.commit('setLang', lang);

                //讓i18n多語系套件切換至所選語系
                this.$i18n.locale = this.$store.getters.getLang;

                //將所選語系代碼存入localStorage
                localStorage.setItem('footmark-lang', lang);

            },
            search(){                
                let id = this.querySalesOrder
                this.$router.push({ 
                    name: 'Readonly SalesOrder', // 要事先在 router 那邊命名你的元件
                    params: { id } 
                })
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
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.55);
    }
</style>

<style scoped>
/* override navbar color */
 .navbar.navbar-dark.bg-secondary{
     background-color: rgb(137, 30, 49)!important;
 }
</style>