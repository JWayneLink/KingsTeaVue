<template>
    <div class="login">
        <div class="form">
            <!-- Login -->
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Username</label>
                <input v-model="username" type="text" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>

            <button @click="login" class="btn btn-dark btn-lg btn-block">Login</button>
        </div>

        <!-- User 小抄 -->
        <!-- <div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in gitusers" :key="item.gituser">
                        <td>{{ item.gituser }}</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<script>
    import store from '../store/index'

    export default {
        name: 'Login',
        data() {
            return {
                username: null,
                password: null,
                gitusers: [{
                        gituser: 'mojombo'
                    },
                    {
                        gituser: 'evanphx'
                    },
                    {
                        gituser: 'brynary'
                    },
                    {
                        gituser: 'takeo'
                    },
                    {
                        gituser: 'jwaynelink'
                    },
                ]
            }
        },
        methods: {
            login() {
                // Authenticate against API

                // debugger;
                store.user = this.username;
                this.$router.push(`/user/${this.username}`);
            }
        }
    }
</script>


<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 0 auto;
        margin-top: 40px;
    }

    .form-group {
        padding: 10px;
        margin-bottom: 20px;
    }

    button {
        width: 50%;
        margin: 0 auto;
    }

    h3{
        text-align: center;
    }

    table,
    th,
    td {
        border: 1px solid black;
    }
</style>