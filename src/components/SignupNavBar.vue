<template>

<div id="app1">
        <b-navbar type="dark" variant="secondary " >
            <b-navbar-nav>
                <b-nav-item right>
                    <router-link to="/account/login"> {{ $t('SignupBar.SignIn') }} </router-link>
                </b-nav-item>
                <b-nav-item right>
                    <router-link to="/account/new"> {{ $t('SignupBar.SignUn') }} </router-link>
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
                isLogged: 'false'
            }
        },
        components: {

        },
        created () {

        },
        methods: {
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