# VueFlix — Starter (Vue 3 + Vite + OMDb)

Un proyecto base minimalista para que tus estudiantes construyan un clon estilo Netflix consumiendo **JSON** de la API **OMDb**.

## 🚀 Objetivo didáctico
- Procesar respuestas **JSON** reales (búsqueda, paginación, detalle).
- Trabajar con **fetch**, **query params**, y **ruteo** (vue-router).
- Separar responsabilidades (servicios vs vistas vs componentes).
- Extender el starter con features propias.

## 🧱 Estructura
```
vue-netflix-starter-omdb/
├── .env.example           # Copiar a .env y completar API KEY
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── assets/
    │   └── styles.css
    ├── components/
    │   └── MovieCard.vue
    ├── services/
    │   └── omdbApi.js
    ├── views/
    │   ├── HomeView.vue
    │   └── MovieDetail.vue
    ├── App.vue
    └── main.js
```

## 🔧 Instalación y ejecución
1. **Descarga** este repo (o el ZIP).
2. Copia `.env.example` a `.env` y define `VITE_OMDB_API_KEY`.
3. Instala dependencias:
   ```bash
   npm i
   ```
4. Corre en desarrollo:
   ```bash
   npm run dev
   ```

## 🧪 Prueba rápida
- Busca por *Batman*, *Matrix* o *Friends*.
- Haz clic en una tarjeta para ver detalles.
- Usa la paginación (OMDb entrega 10 por página).

## 📚 Tareas para el estudiante
1. **Filtros**: agrega select para `type` (movie/series/episode) y ordénalo por `Year` descendente en la UI.
2. **Favoritos**: implementa una lista de favoritos en `localStorage`.
3. **Infinite scroll**: reemplaza la paginación por scroll infinito.
4. **Manejo de errores**: mensajes diferenciados para HTTP vs errores de API.
5. **Skeletons**: agrega “skeleton loaders” mientras carga.
6. **Accesibilidad**: añade etiquetas ARIA y foco visible al navegar con teclado.
7. **Testing opcional**: crea pruebas unitarias de `omdbApi.js` usando fetch mock.

## 🧩 Sugerencias de extensión
- Modal en lugar de página de detalle.
- Sección de “Top Rated” mockeada a partir de un JSON local.
- Cuadrícula responsive con “auto-fill minmax” (ya incluida).
- Caching simple por query+page (Map en memoria o `sessionStorage`).

## 🆘 Ayuda
- Si no ves resultados, revisa tu **API Key** y los **CORS** (OMDb permite llamadas desde el navegador).

¡Buen código y a divertirse! 🎬
