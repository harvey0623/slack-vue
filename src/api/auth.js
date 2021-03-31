import firebase from '@/plugins/firebase/index.js';
export const authApi = {
   async login() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      return await firebase.auth().signInWithPopup(provider).then(info => {
            let { email, given_name, picture } = info.additionalUserInfo.profile;
            return { 
               status: true,
               accessToken: info.credential.accessToken,
               profile: { name: given_name, email, picture }
            }
         }).catch(err => {
            return { status: false, message: err.message };
         });
   },
   async logout() {
      await firebase.auth().signOut();
   }
}