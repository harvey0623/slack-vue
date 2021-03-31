import { authApi } from '@/api/auth.js';
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
      async login({ state, commit }) {
         let loginResult = await authApi.login();
         if (loginResult.status) {
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
      async logout({ commit }) {
         await authApi.logout();
         commit('setProfile', {});
         commit('setAccessToken', '');
         storage.removeItem('userInfo');
      }
   }
}