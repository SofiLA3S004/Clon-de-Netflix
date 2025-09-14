<template>
  <section>
    <h1>Favoritos</h1>
    <div v-if="favorites.length" class="grid">
      <MovieCard
        v-for="m in favorites"
        :key="m.imdbID"
        :movie="m"
        :hideButtons="true"
      />
    </div>
    <div v-else class="empty">No hay películas en favoritos.</div>
    <button class="back" @click="navigateToHome">Volver</button>
  </section>
</template>

<script setup>
import { getFavorites } from '../services/omdbApi';
import { ref, onMounted } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import { useRouter } from 'vue-router';

const favorites = ref([]);
const router = useRouter();

onMounted(() => {
  favorites.value = getFavorites();
});

function navigateToHome() {
  router.push({ name: 'home' });
}
</script>