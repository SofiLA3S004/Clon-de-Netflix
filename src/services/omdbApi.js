const API_BASE = 'https://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

async function request(params){
  const url = new URL(API_BASE)
  if(!API_KEY) throw new Error('Falta VITE_OMDB_API_KEY en tu .env')
  url.search = new URLSearchParams({ apikey: API_KEY, ...params }).toString()
  const res = await fetch(url.toString())
  if(!res.ok) throw new Error('HTTP ' + res.status)
  return await res.json()
}

/**
 * Busca por texto. OMDb entrega 10 por página.
 * @param {string} q
 * @param {number} page
 * @param {'movie'|'series'|'episode'} [type]
 */
export async function searchMovies(q, page=1, type){
  if(!q || !q.trim()) return { Response:'False', Error:'Ingresa un término de búsqueda' }
  const params = { s: q.trim(), page: String(page) }
  if(type) params.type = type
  return await request(params)
}

/**
 * Obtiene detalles por imdbID
 * @param {string} imdbID
 */
export async function getMovieById(imdbID){
  return await request({ i: imdbID, plot: 'full' })
}

export const favorites = [];

export function addToFavorites(movie) {
  if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
    favorites.push(movie);
  }
}

export function getFavorites() {
  return favorites;
}

export const watchLater = [];

export function addToWatchLater(movie) {
  if (!watchLater.some(watch => watch.imdbID === movie.imdbID)) {
    watchLater.push(movie);
  }
}

export function getWatchLater() {
  return watchLater;
}
