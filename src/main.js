import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api'
import '@/plugins/firebase/index.js'
import '@/components/global/index.js'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
