<template>
  <div>
    <h1>Son 12 Film</h1>
    <div v-if="movies.length" class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" @click="goToDetail(movie.id)" class="movie-item">
        <img :src="movie.poster || 'path/to/default-image.jpg'" alt="movie.title" />
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
    <div v-else>
      <p>Yükleniyor...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: []
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await fetch('https://freetestapi.com/api/v1/movies');
        const data = await response.json();
        this.movies = data.slice(0, 12);
      } catch (error) {
        console.error("API Hatası:", error);
      }
    },
    goToDetail(id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  created() {
    this.fetchMovies();
  }
};
</script>

<style scoped>
/* Genel sayfa stil ayarları */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Film listesi stil ayarları */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

.movie-item {
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;
}

.movie-item img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-item:hover {
  transform: scale(1.05);
}

.movie-item h3 {
  margin-top: 10px;
  font-size: 1.2em;
}
</style>
