<template>
  <section>
    <h1>Por Ver</h1>
    <div v-if="watchLater.length" class="grid">
      <MovieCard
        v-for="m in watchLater"
        :key="m.imdbID"
        :movie="m"
        :hideButtons="true"
      />
    </div>
    <div v-else class="empty">No hay películas en la lista de "Por Ver".</div>
    <button class="back" @click="navigateToHome">Volver</button>
  </section>
</template>

<script setup>
import { getWatchLater } from '../services/omdbApi';
import { ref, onMounted } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import { useRouter } from 'vue-router';

const watchLater = ref([]);
const router = useRouter();

onMounted(() => {
  watchLater.value = getWatchLater();
});

function navigateToHome() {
  router.push({ name: 'home' });
}
</script>