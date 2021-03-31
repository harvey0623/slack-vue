import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/firebase/index.js'
import '@/components/global/index.js'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
