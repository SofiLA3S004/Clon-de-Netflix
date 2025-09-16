<template>
  <article class="card" role="button">
    <img :src="posterSrc" :alt="movie.Title" loading="lazy" v-if="!showTrailer" />
    <iframe v-if="showTrailer" class="trailer" :src="`${trailerSrc}?autoplay=1`" frameborder="0" allowfullscreen></iframe>
    <button v-if="trailerSrc" class="trailer-button" @click="toggleTrailer">{{ showTrailer ? 'Cerrar Trailer' : 'Ver Trailer' }}</button>
    <div class="meta">
      <div class="title">{{ movie.Title }}</div>
      <div class="year">{{ movie.Year }} • {{ movie.Type }}</div>
    </div>
    <button v-if="!isFavorite(movie)" @click="addToFavorites(movie)">Agregar a Favoritos</button>
    <button v-if="!isWatchLater(movie)" @click="addToWatchLater(movie)">Agregar a Por Ver</button>
  </article>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { addToFavorites as addToFavoritesService, addToWatchLater as addToWatchLaterService, favorites, watchLater, getTrailer } from '../services/omdbApi';

const props = defineProps({
  movie: { type: Object, required: true }
})
const posterSrc = computed(() => {
  const p = props.movie.Poster
  return p && p !== 'N/A' ? p : 'https://placehold.co/300x450?text=No+Poster'
})
const trailerSrc = ref(null);
const showTrailer = ref(false);

onMounted(async () => {
  trailerSrc.value = await getTrailer(props.movie.imdbID);
});

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

function toggleTrailer() {
  showTrailer.value = !showTrailer.value;
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
}
.trailer {
  width: 100%;
  height: 225px;
  border-radius: 0.5rem;
}
.trailer-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #00cc66;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.trailer-button:hover {
  background-color: #00994d;
}
</style>
