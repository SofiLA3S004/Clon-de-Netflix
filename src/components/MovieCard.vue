<template>
  <article class="card" role="button">
    <img :src="posterSrc" :alt="movie.Title" loading="lazy" />
    <div class="meta">
      <div class="title">{{ movie.Title }}</div>
      <div class="year">{{ movie.Year }} • {{ movie.Type }}</div>
    </div>
    <button v-if="!isFavorite(movie)" @click="addToFavorites(movie)">Agregar a Favoritos</button>
    <button v-if="!isWatchLater(movie)" @click="addToWatchLater(movie)">Agregar a Por Ver</button>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { addToFavorites as addToFavoritesService, addToWatchLater as addToWatchLaterService, favorites, watchLater } from '../services/omdbApi';

const props = defineProps({
  movie: { type: Object, required: true }
})
const posterSrc = computed(() => {
  const p = props.movie.Poster
  return p && p !== 'N/A' ? p : 'https://placehold.co/300x450?text=No+Poster'
})

function addToFavorites(movie) {
  addToFavoritesService(movie);
  alert(`${movie.Title} agregado a Favoritos`);
}

function addToWatchLater(movie) {
  addToWatchLaterService(movie);
  alert(`${movie.Title} agregado a Por Ver`);
}

function isFavorite(movie) {
  return favorites.some(fav => fav.imdbID === movie.imdbID);
}

function isWatchLater(movie) {
  return watchLater.some(watch => watch.imdbID === movie.imdbID);
}
</script>
