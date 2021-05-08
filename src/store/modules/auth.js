import { authApi, databaseApi } from '@/api/index.js';
import { webCrypto } from '@/plugins/crypto/webCrypto.js';
import { storage } from '@/plugins/storage/index.js';
import _ from 'lodash';
export const authStore = {
   namespaced: true,
   state: () => ({
      profile: {},
      accessToken: ''
   }),
   mutations: {
      setProfile(state, payload) {
         state.profile = payload;
      },
      setAccessToken(state, payload) {
         state.accessToken = payload;
      },
   },
   getters: {
      isLogin(state) {
         let hasToken = state.accessToken !== '';
         let hasProfile = _.isEmpty(state.profile);
         return hasToken && !hasProfile;
      }
   },
   actions: {
      checkHasUserInto({ commit }) {
         let userInfo = storage.getItem('userInfo');
         if (userInfo === null) return;
         let { profile, accessToken } = webCrypto.decodeUserInfo(userInfo.data);
         commit('setProfile', profile);
         commit('setAccessToken', accessToken);
      },
      async login({ state, commit, dispatch }) {
         let loginResult = await authApi.login();
         if (loginResult.status) {
            await databaseApi.saveUser(loginResult.profile);
            commit('setProfile', loginResult.profile);
            commit('setAccessToken', loginResult.accessToken);
            let encode = webCrypto.encodeUserInfo({
               profile: state.profile,
               accessToken: state.accessToken
            });
            storage.setItem('userInfo', { data: encode });
         }
         return {
            status: loginResult.status,
            message: loginResult.status ? '' : loginResult.message
         }
      },
      async logout({ state, commit, dispatch, rootState }) {
         await databaseApi.removePresence(state.profile.uid);
         await authApi.logout();
         if (rootState.channelId !== '') {
            await dispatch('removeEvent', null, { root: true });
         }
         commit('setProfile', {});
         commit('setAccessToken', '');
         commit('setFavorUser', '', { root: true });
         storage.removeItem('userInfo');
      },
   }
}