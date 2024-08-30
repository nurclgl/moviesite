import { createRouter, createWebHistory } from 'vue-router';
import ListingPage from '../views/ListingPage.vue';
import DetailPage from '../views/DetailPage.vue';
import FavoritesPage from '../views/FavoritesPage.vue';
import SearchResults from '../components/SearchResults.vue'; // Import SearchResults component

const routes = [
  { path: '/', component: ListingPage },
  { path: '/detail/:id', component: DetailPage },
  { path: '/favorites', component: FavoritesPage },
  { path: '/search', component: SearchResults } // Add route for search results
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

