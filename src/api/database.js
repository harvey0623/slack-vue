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
      return await channelRef.child(key).update({ id: key, name: channelName })
         .then(() => {
            return { status: true, message: '' }  
         }).catch(err => {
            return { status: false, message: err.message }
         });
   },
   async getChannels() {
      let channelRef = firebase.database().ref('channels');
      let channels = await channelRef.get();
      if (channels.val() === null) return [];
      else return Object.values(channels.val());
   }
}