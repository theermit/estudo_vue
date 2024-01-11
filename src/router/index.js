import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '../views/Login'
import ListaContatos from '../views/ListaContatos'
import Cadastro from '../views/Cadastro'
import IncluirContato from '../views/IncluirContato'

Vue.use(VueRouter)

/*
async function requireAuth(to, from, next) {
	const { autorizado } = to.meta
	if (store.state.logado) {
		if (autorizado) {
			autorizado.includes(store.state.unidadeInicial) ? next() : next('/acesso-negado')
		} else { next() }
	} else {
		if (await login.login()) {
			next()
		} else {
			next('/acesso-negado')
		}
	}
}
*/
const routes = [
  /*{
    path: '/',
    name: 'home',
    get component() {
      return PaginaInicial //PaginaInicialRede
    },
    props: true,
    beforeEnter: requireAuth
  },*/
  {
    path: '/',
    name: 'Login',
    component: Login,
    props: false
  },
  {
    path: '/listacontatos',
    name: 'ListaContatos',
    component: ListaContatos,
    props: false,
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    props: false
  },
  {
    path: '/incluircontato/:tipo_form/:id_contato?',
    name: 'IncluirContato',
    component: IncluirContato,
    props: true
  }
]


const router = new VueRouter({
  routes
})

export default router
