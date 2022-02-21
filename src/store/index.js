import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    user:null,
    state: {
        lang : null, // 存放使用者選用的語系
        count: 0
    },
    getters: {
        getLang: state => {
          return state.lang;
        }
      },
    mutations: {
        increment (state) {
        state.count++
        },
        // 切換語系設定
        setLang (state, value) {
            state.lang = value;
        }
    },
    actions: {},
    modules: {}
});
