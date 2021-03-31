import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth.js';
import { authPlugin } from './plugins/auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentChannel: ''
	},
	mutations: {
		setChannel(state, payload) {
			state.currentChannel = payload;
		}
	},
	actions: {
		
	},
	modules: {
		authStore
	},
	plugins: [authPlugin]
})
