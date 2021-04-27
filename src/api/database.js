import firebase from '@/plugins/firebase/index.js';
export const databaseObj = {
   async saveUser(payload) {
      let userRef = firebase.database().ref('users');
      let { uid, name, picture } = payload;
      await userRef.child(uid).set({ name, avatar: picture });
   },
   async addChannel(channelName) {
      let channelRef = firebase.database().ref('channels');
      let key = channelRef.push().key;
      return await channelRef.child(key).set({ id: key, name: channelName })
         .then(() => {
            return { status: true, message: '' };
         }).catch(err => {
            return { status: false, message: err.message };
         });
   },
   async addMessage({ channelId, msgInfo }) {
      let messageRef = firebase.database().ref('messages');
      await messageRef.child(channelId).push().set(msgInfo);
   },
   async addPrivateMsg({ channelId, msgInfo }) {
      let privateMsgRef = firebase.database().ref('privateMsg');
      await privateMsgRef.child(channelId).push().set(msgInfo);
   },
   async removePresence(userId) { //移除沒上線的狀態
      let presenceRef = firebase.database().ref('presence');
      await presenceRef.child(userId).remove();
   }
}