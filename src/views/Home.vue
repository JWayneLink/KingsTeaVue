<template>
    <div id="home" class="home">
        <div class="container">
            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                    <ul>
                        <li>
                            <img src="../assets/logo.png">
                            {{parentNode}}
                        </li>
                        <ul>
                            <li v-for="item in skills" :key="item.skill">
                                {{item.skill}}
                            </li>
                        </ul>
                    </ul>
                </div>
                <div class="col">

                </div>
            </div>

            <div class="row">
                <div class="col">
                </div>
                <div class="col">
                    <ul>
                        <li>
                            <!-- <img src="../assets/logo.png"> -->
                            {{ API_title }}
                        </li>
                        <ul>
                            <li v-for="api in dummyAPI"  :key="api">
                                <a v-bind:href="api" target="_blank"> {{ api }}</a>
                            </li>
                        </ul>
                    </ul>
                </div>
                <div class="col">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    // import VueButton from '../components/Button'

    Vue.use(VueRouter)


    export default {
        name: 'Home',
        data() {
            return {
                parentNode: 'Vue Learning',
                skills: [{
                        skill: 'npm install vue-router'
                    },
                    {
                        skill: 'npm install vue bootstrap-vue bootstrap'
                    },
                    {
                        skill: 'npm install vue-i18n'
                    },
                    {
                        skill: 'npm install axios vue-axios --save'
                    },
                    {
                        skill: 'npm install vuex --save'
                    },
                    {
                        skill: 'npm install vuetify'
                    },
                    {
                        skill: 'npm install vee-validate --save'
                    },
                    {
                        skill: 'npm install chart.js --save'
                    },
                    {
                        skill: 'npm install vue-chartjs chart.js --save'
                    },
                    {
                        skill: 'npm install vue-typeahead-bootstrap --save'  
                    },
                    {
                        skill: 'npm install apexcharts --save'
                    },
                    {
                        skill: 'npm install vue3-apexcharts --save'  
                    }
                ],
                API_title:"APIs",
                dummyAPI: 
                [
                    "https://api.github.com/users", "https://api.covidtracking.com/v1/us/daily.json",
                    "https://jsonplaceholder.typicode.com/users"
                ],
                APImarks:["Github Users","COVID daily info","JSON placeholder users"]
            }
        },
        components: {
            // 'HelloWorld': HelloWorld,
            // 'VueButton': VueButton,
        }
    }
</script>

<style scoped>
    .home ul {
        display: inline-block;
        text-align: left;
    }

    img {
        width: 50px;
        height: 50px;
    }
</style>