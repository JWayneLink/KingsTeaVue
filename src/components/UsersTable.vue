<template>
    <div>
        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'


    Vue.use(VueAxios, axios)
    export default {
        data() {
            return {
                // Note 'isActive' is left out and will not appear in the rendered table
                fields: [{
                        key: 'id',
                        // sortable: true
                    },
                    {
                        key: 'name',
                        // sortable: true
                    },
                    {
                        key: 'company',
                        // sortable: false
                    },
                    {
                        key: 'phone',
                        // sortable: false
                    },
                    {
                        key: 'email',
                        // sortable: true
                        // Variant applies to the whole column, including the header and footer
                        // variant: 'danger'
                    }
                ],
                items: []
            }
        },
        mounted: async function () {

            let results = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            console.log(results)
            results.data.forEach((element) => {
                console.log(element)
                let itemObj = {};
                itemObj.id = element.id;
                itemObj.name = element.name;
                itemObj.company = element.company.name;
                itemObj.phone = element.phone;
                itemObj.email = element.email;
                this.items.push(itemObj);
            });

        },
        methods: {

        },
    }
</script>