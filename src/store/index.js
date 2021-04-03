import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth.js';
import { authPlugin } from './plugins/auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentChannel: '',
		channelLists: []
	},
	mutations: {
		setCurrentChannel(state, payload) {
			state.currentChannel = payload;
		},
		setChannelItem(state, payload) {
			state.channelLists.push(payload);
		}
	},
	getters: {
		channelName(state) {
			let data = state.channelLists.find(item => item.id === state.currentChannel);
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
