import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js';
import Chat from '../views/chat.vue'
import Login from '../views/login.vue';

Vue.use(VueRouter)

const routes = [
	{
		path: '/chat',
		name: 'chat',
		component: Chat,
		meta: {
			auth: true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		beforeEnter(to, from, next) {
			if (store.getters['authStore/isLogin']) return next('/chat');
			else return next();
		}
	},
	{
		path: '*',
		redirect: '/login'
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(item => item.meta.auth === true)) {
		if (store.getters['authStore/isLogin']) return next();
		else return next('/login');
	}
	return next();
});

export default router
