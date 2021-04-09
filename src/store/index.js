import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth.js';
import { authPlugin } from './plugins/auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		channelId: '',
		channelLists: [],
		isPrivate: false,
	},
	mutations: {
		setChannelId(state, payload) {
			state.channelId = payload;
		},
		setChannelItem(state, payload) {
			state.channelLists.push(payload);
		},
		clearChannelLists(state) {
			state.channelLists = [];
		},
		setIsPrivate(state, payload) {
			state.isPrivate = payload;
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
