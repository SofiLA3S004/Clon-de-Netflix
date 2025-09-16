<template>
  <div class="trailer-page">
    <header class="header">
      <div class="brand">
        <span class="dot"></span>
        <span>Mi App de Películas</span>
      </div>
    </header>

    <main class="container">
      <h1>{{ movieTitle }}</h1>
      <div class="video-wrapper">
        <iframe
          v-if="trailerKey"
          :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1`"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
        <p v-else>No hay trailer disponible.</p>
      </div>

      <button class="back" @click="$router.back()">⬅ Volver</button>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getTrailer } from '../services/omdbApi'

const route = useRoute()
const imdbID = route.params.id
const movieTitle = route.query.title || "Trailer"

const trailerKey = ref(null)

onMounted(async () => {
  trailerKey.value = await getTrailer(imdbID)
})
</script>

<style scoped>
.trailer-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000, #4b0082);
  color: #fff;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin: 1rem 0;
}

.video-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  width: 100%;
  max-width: 900px;
}

iframe {
  width: 100%;
  height: 500px;
  border-radius: 12px

