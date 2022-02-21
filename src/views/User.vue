<template>
    <div class="container">
        <h3> {{ this.$route.params.userId }} </h3>

        <img v-bind:src="avatar_url" class="circular--square" alt="avatar" />
        <a v-bind:href="html_url" target="_blank" style="margin-left:45%"><img src="../assets/github.png" style="width:50px;display: inline-block;padding:0px;" /></a>
        <span style="font-weight: bold;font-size: large;"> {{ name}} </span><br>
        <span style="margin-left:48%"> {{location}} </span>

        <hr>
        <UsersTable></UsersTable>
    </div>
</template>


<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import UsersTable from '../components/UsersTable'
    import api from "@/api";

    Vue.use(VueAxios, axios)

    export default {
        name: 'User',
        data: function () {
            return {
                login: 'test',
                avatar_url: '',
                name: '',
                location: '',
                html_url: '',
                resource: {}
            }
        },
        components: {
            'UsersTable': UsersTable,
            // 'VueButton': VueButton,
        },
        created: async function () {
            if (this.$route.params.userId != "error") {
                
                // ================Get User Info================
                let response = await axios.get(`https://api.github.com/users/${this.$route.params.userId}`);
                this.avatar_url = response.data.avatar_url;
                this.name = response.data.name;
                this.location = response.data.location;
                this.html_url = response.data.html_url;
            } else {
                // ================Mock Error API================
                api.get(`/not-found`)
                    .then(res => this.resource = res.data.resource);
            }
        },
        watch: {
            login(newValue, oldValue) {
                console.log("newValue = " + newValue + " oldValue = " + oldValue);
            }
        }
    }
</script>

<style scoped>
    img {
        vertical-align: middle;
        width: 200px;
        display: inherit;
        margin: 0 auto;
    }

    .circular--square {
        border-top-left-radius: 50% 50%;
        border-top-right-radius: 50% 50%;
        border-bottom-right-radius: 50% 50%;
        border-bottom-left-radius: 50% 50%;
    }

    h3{
        text-align: center;
    }

</style>