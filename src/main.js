import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import MovieDetail from './views/MovieDetail.vue'
import FavoritesView from './views/FavoritesView.vue'
import WatchLaterView from './views/WatchLaterView.vue'
import './assets/styles.css'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/movie/:imdbID', name: 'movie', component: MovieDetail, props: true },
  { path: '/favorites', name: 'favorites', component: FavoritesView },
  { path: '/watch-later', name: 'watch-later', component: WatchLaterView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
