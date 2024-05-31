import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetail from '../views/BookDetail.vue'
import BookShelf from '@/views/BookShelf.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      children: [
        {
          path: '/bookshelf',
          name: 'Bookshelf',
          component: BookShelf,
        },
        {
          path: '/book/:bid',
          name: 'Book',
          props: true,
          component: BookDetail
        }
      ]
    },
  ]
})

export default router
