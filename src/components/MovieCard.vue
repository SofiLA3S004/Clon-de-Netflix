<template>
  <article class="card">
    <img :src="posterSrc" :alt="movie.Title" loading="lazy" />

    <div class="meta">
      <div class="title">{{ movie.Title }}</div>
      <div class="year">{{ movie.Year }} • {{ movie.Type }}</div>
    </div>

    <button v-if="!isFavorite(movie)" @click="addToFavorites(movie)">
      Agregar a Favoritos
    </button>
    <button v-if="!isWatchLater(movie)" @click="addToWatchLater(movie)">
      Agregar a Por Ver
    </button>
    <button v-if="trailerKey" @click="openTrailer">
      Ver Trailer
    </button>
  </article>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import {
  addToFavorites as addToFavoritesService,
  addToWatchLater as addToWatchLaterService,
  favorites,
  watchLater,
  getTrailer
} from '../services/omdbApi'

const props = defineProps({
  movie: { type: Object, required: true }
})

const posterSrc = computed(() => {
  const p = props.movie.Poster
  return p && p !== 'N/A'
    ? p
    : 'https://placehold.co/300x450?text=No+Poster'
})

const trailerKey = ref(null)

onMounted(async () => {
  trailerKey.value = await getTrailer(props.movie.imdbID)
})

function openTrailer() {
  if (trailerKey.value) {
    const url = `https://www.youtube.com/watch?v=${trailerKey.value}`
    // 👉 Abrir en una nueva pestaña con estilo de la app
    const nuevaVentana = window.open('', '_blank')
    nuevaVentana.document.write(`
      <html>
        <head>
          <title>${props.movie.Title} - Trailer</title>
          <style>
            body {
              margin: 0;
              background: linear-gradient(135deg, #000000, #4b0082);
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
            }
            iframe {
              width: 90%;
              height: 80%;
              border: none;
              border-radius: 12px;
              box-shadow: 0 0 20px rgba(0,0,0,0.8);
            }
          </style>
        </head>
        <body>
          <iframe src="https://www.youtube.com/embed/${trailerKey.value}?autoplay=1"
            allow="autoplay; encrypted-media" allowfullscreen>
          </iframe>
        </body>
      </html>
    `)
  } else {
    alert('No hay trailer disponible.')
  }
}

function addToFavorites(movie) {
  addToFavoritesService(movie)
  alert(`${movie.Title} agregado a Favoritos`)
}

function addToWatchLater(movie) {
  addToWatchLaterService(movie)
  alert(`${movie.Title} agregado a Por Ver`)
}

function isFavorite(movie) {
  return favorites.some(fav => fav.imdbID === movie.imdbID)
}

function isWatchLater(movie) {
  return watchLater.some(watch => watch.imdbID === movie.imdbID)
}
</script>
