import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import { user } from "@/store/module/user"
import { router } from "@/store/module/router"
import { dictionary } from "@/store/module/dictionary"
Vue.use(Vuex)

const fileServerURL = "121.36.21.193:9090"

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['user']
})
export default {
    fileServerURL
}

export const store = new Vuex.Store({
    modules: {
        user,
        router,
        dictionary
    },
    plugins: [vuexLocal.plugin]
})