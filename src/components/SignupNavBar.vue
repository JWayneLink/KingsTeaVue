<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">Navbar</a>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
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