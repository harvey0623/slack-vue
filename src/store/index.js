import Vue from 'vue'
import Vuex from 'vuex'
import { authStore } from './modules/auth.js';
import { authPlugin } from './plugins/auth.js';
import firebase from '@/plugins/firebase/index.js';
const messageRef = firebase.database().ref('messages');
const privateMsgRef = firebase.database().ref('privateMsg');
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		channelId: '',
		channelLists: [],
		userLists: [],
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
		addUserItem(state, payload) {
			state.userLists.push(payload);
		},
		changeUserOnlineStatus(state, payload) {
			let targetUser = state.userLists.find(user => user.uid === payload.userId);
			if (targetUser === undefined) return;
			targetUser.isOnline = payload.status;
		},
		clearUserLists(state) {
			state.userLists = [];
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
		removeEvent({ state, commit }) {
			if (state.isPrivate) {
				let channelId = state.channelId;
         	let profileUid = state.authStore.profile.uid;
         	let ref = channelId < profileUid ? `${channelId}/${profileUid}` : `${profileUid}/${channelId}`;
				privateMsgRef.child(ref).off('child_added');
			} else {
				messageRef.child(state.channelId).off('child_added');
			}
			commit('setIsPrivate', false);
		}
	},
	modules: {
		authStore
	},
	plugins: [authPlugin]
})
