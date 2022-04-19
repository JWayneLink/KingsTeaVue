<template>
    <div id="app1">
        <b-navbar type="dark" variant="secondary" >
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/mainpage"> {{ $t('NavBar.Home') }} </router-link>
                </b-nav-item>

                <!-- Navbar dropdowns -->
                <!-- Product Nav -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.Product.title')">
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/product/new">{{$t('NavBar.Product.actions[0]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                         <router-link style="color:black;" to="/product/maintenance">{{$t('NavBar.Product.actions[1]')}}</router-link>
                    </b-dropdown-item>
                    <!-- <b-dropdown-item href="#">
                         <router-link style="color:black;" to="/product/information">{{$t('NavBar.Product.actions[2]')}}</router-link>
                    </b-dropdown-item> -->
                </b-nav-item-dropdown>

                <!-- Customer Nav -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.Customer.title')">
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/customer/new">{{ $t('NavBar.Customer.actions[0]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                         <router-link style="color:black;" to="/customer/maintenance">{{ $t('NavBar.Customer.actions[1]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                        <router-link style="color:black;" to="/customer/information">{{ $t('NavBar.Customer.actions[2]')}}</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>

                <!-- SalesOrder Nav -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.SalesOrder.title')">
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/salesorder/new">{{ $t('NavBar.SalesOrder.actions[0]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/salesorder/information">{{ $t('NavBar.SalesOrder.actions[1]')}}</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>

      
            </b-navbar-nav>


            <!-- Right Area -->
            <b-navbar-nav class="ms-auto">
                <!-- Navbar dropdowns -->

                <!-- Account -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.Account.title')">                    
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/account/new">{{$t('NavBar.Account.actions[0]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/account/maintenance">{{$t('NavBar.Account.actions[1]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/account/setting">{{$t('NavBar.Account.actions[2]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item href="#" @click="logout">
                         <router-link style="color:black;" to="/account/login">{{$t('NavBar.Account.actions[3]')}}</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <!-- Languages -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.Lang.title')" >
                    <b-dropdown-item v-bind:data-lang="lan" href="#" right v-on:click="changelanguage"
                        v-for="lan in $t('NavBar.Lang.langs')" :key="lan">{{ lan }}
                    </b-dropdown-item>
                </b-nav-item-dropdown>


                <b-nav-item>                    
                    <b-avatar variant="outline-primary" ></b-avatar>
                </b-nav-item>
                                
            </b-navbar-nav>
        </b-navbar>
        <router-view />
    </div>
</template>

<script>
    // import NavBar
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
                
            }
        },
        mounted()
        {
            
        },
        methods: {
            logout(){
                // remove access_token from localStorage
                localStorage.removeItem('access_token');
                this.$bus.$emit('logged', 'logout')
            },
            changelanguage: function (event) {
                let lang = event.target.getAttribute('data-lang');
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

            }
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