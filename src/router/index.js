import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/chat.vue'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/chat',
		name: 'chat',
		component: Chat
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
