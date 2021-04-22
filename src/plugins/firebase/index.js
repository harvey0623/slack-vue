import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

firebase.initializeApp({
	apiKey: "AIzaSyCm5kn-3Cx3zCFbon3FpXpGTieOOvlSMko",
	authDomain: "slack-vue-1a6f6.firebaseapp.com",
	projectId: "slack-vue-1a6f6",
	storageBucket: "slack-vue-1a6f6.appspot.com",
	messagingSenderId: "1066323579198",
	appId: "1:1066323579198:web:61a87ec407328a7dcc1c6f",
	measurementId: "G-5TZG2RZF6H"
});

Vue.prototype.$firebase = firebase;
export default firebase;