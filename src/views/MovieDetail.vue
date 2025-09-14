<template>
  <div>
    <div v-if="loading" class="empty">Cargando…</div>
    <div v-else-if="errorMsg" class="error">{{ errorMsg }}</div>
    <div v-else-if="!data" class="empty">No hay datos</div>
    <div v-else class="detail">
      <div class="detail-grid">
        <img :src="posterSrc" :alt="data.Title" />
        <div>
          <h1>{{ data.Title }} <small>({{ data.Year }})</small></h1>
          <p class="muted">{{ data.Rated }} • {{ data.Runtime }} • {{ data.Genre }}</p>
          <p>{{ data.Plot }}</p>
          <ul class="meta-list">
            <li><strong>Director:</strong> {{ data.Director }}</li>
            <li><strong>Actores:</strong> {{ data.Actors }}</li>
            <li><strong>Idioma:</strong> {{ data.Language }}</li>
            <li><strong>País:</strong> {{ data.Country }}</li>
            <li><strong>IMDB:</strong> {{ data.imdbRating }} ({{ data.imdbVotes }} votos)</li>
          </ul>
          <button class="back" @click="$router.back()">Volver</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieById } from '../services/omdbApi'

const route = useRoute()
const imdbID = route.params.imdbID

const data = ref(null)
const loading = ref(true)
const errorMsg = ref('')

const posterSrc = computed(() => {
  const p = data.value?.Poster
  return p && p !== 'N/A' ? p : 'https://placehold.co/400x600?text=No+Poster'
})

onMounted(async () => {
  try{
    const resp = await getMovieById(imdbID)
    if(resp.Response === 'False'){
      errorMsg.value = resp.Error || 'No encontrado'
    }else{
      data.value = resp
    }
  }catch(err){
    console.error(err)
    errorMsg.value = 'Error cargando datos.'
  }finally{
    loading.value = false
  }
})
</script>

<style scoped>
.detail-grid{
  display:grid; grid-template-columns: 260px 1fr; gap: 1.25rem; align-items:start;
}
.detail-grid img{ width:100%; border-radius:.5rem; border:1px solid #222; background:#111 }
h1{ margin:0; font-size:1.6rem }
.muted{ color:#b3b3b3 }
.meta-list{ list-style:none; padding:0; margin: 1rem 0; display:grid; gap:.35rem }
.back{ background:#151515; border:1px solid #2a2a2a; color:var(--text); padding:.5rem .8rem; border-radius:.4rem; cursor:pointer; }
@media (max-width: 720px){
  .detail-grid{ grid-template-columns: 1fr; }
}
</style>
