import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth.js';
import { authPlugin } from './plugins/auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		channelId: '',
		channelLists: []
	},
	mutations: {
		setChannelId(state, payload) {
			state.channelId = payload;
		},
		setChannelItem(state, payload) {
			state.channelLists.push(payload);
		}
	},
	getters: {
		channelName(state) {
			let data = state.channelLists.find(item => item.id === state.channelId);
			return data !== undefined ? data.name : '';
		}
	},
	actions: {
		
	},
	modules: {
		authStore
	},
	plugins: [authPlugin]
})
