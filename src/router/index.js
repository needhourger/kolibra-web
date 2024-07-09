import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookDetail from '../views/BookDetail.vue'
import BookShelf from '@/views/BookShelf.vue'
import ReaderView from "@/views/ReaderView.vue"
import LoginView from "@/views/LoginView.vue"

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
          path: '/book/:bookId',
          name: 'BookDetail',
          props: true,
          component: BookDetail
        },
      ]
    },
    {
      path: '/reader/:bookId/:chapterId',
      name: 'Reader',
      props: true,
      component: ReaderView
    },
    {
      path: '/login',
      name: 'Login',
      props: true,
      component: LoginView,
    }
  ]
})

export default router
