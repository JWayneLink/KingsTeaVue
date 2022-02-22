<template>
    <div id="app1">
        <b-navbar type="dark" variant="secondary " >
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/"> {{ $t('NavBar.Home') }} </router-link>
                </b-nav-item>

                <!-- Navbar dropdowns -->
                <!-- Product -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.Product.title')" right>
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/product/new">{{$t('NavBar.Product.actions[0]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                         <router-link style="color:black;" to="/product/query">{{$t('NavBar.Product.actions[1]')}}</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>

                <!-- <b-nav-item>
                    <router-link to="/product"> {{ $t('NavBar.Product') }} </router-link>
                </b-nav-item> -->
                <b-nav-item>
                    <router-link to="/customer"> {{ $t('NavBar.Customer') }} </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/salesorder"> {{ $t('NavBar.SalesOrder') }} </router-link>
                </b-nav-item>

                <!-- Navbar dropdowns -->
                <!-- Account -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.Account.title')" right>
                    <b-dropdown-item>
                        <router-link style="color:black;" to="/account/new">{{$t('NavBar.Account.actions[0]')}}</router-link>
                    </b-dropdown-item>
                    <b-dropdown-item href="#" @click="logout">
                         <router-link style="color:black;" to="/account/login">{{$t('NavBar.Account.actions[1]')}}</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>

                <!-- Languages -->
                <b-nav-item-dropdown v-bind:text="$t('NavBar.Lang.title')">
                    <b-dropdown-item v-bind:data-lang="lan" href="#" right v-on:click="changelanguage"
                        v-for="lan in $t('NavBar.Lang.langs')" :key="lan">{{ lan }}
                    </b-dropdown-item>
                </b-nav-item-dropdown>

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
        'components': {

        },
        methods: {
            logout(){
                // remove access_token from localStorage
                localStorage.removeItem('access_token');
                this.$router.push(`/account/login`);
                this.$forceUpdate();
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