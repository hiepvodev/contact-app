import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactDetailView from '../views/ContactDetailView.vue'
import ContactEditView from '../views/ContactEditView.vue'
import ContactAddView from '../views/ContactAddView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contacts/:id',
      name: 'contactDetail',
      component: ContactDetailView,
      props: true
    },
    {
      path: '/contacts/:id/edit',
      name: 'contactEdit',
      component: ContactEditView,
      props: true
    },
    {
      path: '/contacts/add',
      name: 'contactAdd',
      component: ContactAddView,
      props: true
    }
  ]
})

export default router
