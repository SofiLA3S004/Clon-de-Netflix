<template>
  <div>
    <section>
      <div class="searchbar">
        <input
          v-model="q"
          type="search"
          placeholder="Busca películas o series (ej: Batman, Matrix, Friends)"
          @keyup.enter="runSearch(1)"
        />
        <button @click="runSearch(1)">Buscar</button>
      </div>
      <div class="controls" v-if="q && totalResults !== null">
        <span class="badge">Resultados: {{ totalResults }}</span>
        <span class="badge" v-if="q">Query: "{{ q }}"</span>
        <span class="badge" v-if="type">Tipo: {{ type }}</span>
      </div>
    </section>

    <section class="navbar">
      <button :class="{ active: isActive('home') }" @click="navigateBack">Inicio</button>
      <button :class="{ active: isActive('favorites') }" @click="navigateTo('favorites')">Favoritos</button>
      <button :class="{ active: isActive('watch-later') }" @click="navigateTo('watch-later')">Por Ver</button>
    </section>

    <section v-if="q && items.length === 0" class="empty">
      <p>Sin resultados. Intenta otra búsqueda.</p>
    </section>

    <section v-if="q && items.length > 0" class="grid">
      <MovieCard
        v-for="m in items"
        :key="m.imdbID"
        :movie="m"
        @click="goTo(m.imdbID)"
      />
    </section>

    <nav v-if="q && pages > 1" class="pagination">
      <button :disabled="page<=1" @click="runSearch(page-1)">« Anterior</button>
      <span class="badge">Página {{ page }} de {{ pages }}</span>
      <button :disabled="page>=pages" @click="runSearch(page+1)">Siguiente »</button>
    </nav>

    <section v-if="!q && favorites.length" class="favorites">
      <h2>Favoritos</h2>
      <div class="grid">
        <MovieCard
          v-for="m in favorites"
          :key="m.imdbID"
          :movie="m"
        />
      </div>
    </section>

    <section v-if="!q && watchLater.length" class="watch-later">
      <h2>Por Ver</h2>
      <div class="grid">
        <MovieCard
          v-for="m in watchLater"
          :key="m.imdbID"
          :movie="m"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'
import { searchMovies, getFavorites, getWatchLater } from '../services/omdbApi'

const route = useRoute()
const router = useRouter()

const q = ref(route.query.q ?? '')
const type = ref(route.query.type ?? '') // movie, series, episode
const page = ref(Number(route.query.page ?? 1))

const items = ref([])
const totalResults = ref(null)
const loading = ref(false)
const errorMsg = ref('')

const favorites = ref([])
const watchLater = ref([])

const pages = computed(() => {
  const total = Number(totalResults.value || 0)
  return Math.max(1, Math.ceil(total / 10)) // OMDb returns 10 per page
})

async function runSearch(toPage = 1){
  errorMsg.value = ''
  loading.value = true
  page.value = toPage
  try{
    const resp = await searchMovies(q.value, toPage, type.value || undefined)
    if(resp.Response === 'False'){
      items.value = []
      totalResults.value = 0
      errorMsg.value = resp.Error || 'Sin resultados'
    }else{
      items.value = resp.Search || []
      totalResults.value = Number(resp.totalResults || 0)
      errorMsg.value = ''
    }
    // reflect in URL
    router.replace({ name:'home', query: { q: q.value || undefined, page: page.value, type: type.value || undefined }})
  }catch(err){
    console.error(err)
    errorMsg.value = 'Error cargando datos. Revisa tu API key o conexión.'
  }finally{
    loading.value = false
  }
}

function goTo(imdbID){
  router.push({ name: 'movie', params: { imdbID }})
}

function navigateBack() {
  router.push({ name: 'home' });
}

function navigateTo(name) {
  router.push({ name });
}

function isActive(name) {
  return route.name === name;
}

watch(() => route.query, (qParams) => {
  // react to back/forward navigation
  q.value = qParams.q ?? ''
  type.value = qParams.type ?? ''
  page.value = Number(qParams.page ?? 1)
}, { deep:true })

onMounted(() => {
  if(q.value){
    runSearch(page.value)
  }
  favorites.value = getFavorites();
  watchLater.value = getWatchLater();
})
</script>
