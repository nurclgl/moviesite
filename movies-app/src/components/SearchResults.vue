<template>
  <div class="search-results">
    <h1>Arama Sonuçları</h1>
    <div v-if="movies.length">
      <div v-for="movie in movies" :key="movie.id" class="movie-item" @click="goToDetail(movie.id)">
        <img :src="movie.poster" alt="movie.title" class="movie-poster" />
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
    <div v-else>
      <p>Arama sonuçları bulunamadı.</p>
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
    async fetchMovies(query) {
      try {
        const response = await fetch(`https://freetestapi.com/api/v1/movies?search=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.movies = data;
      } catch (error) {
        console.error("API Hatası:", error);
      }
    },
    goToDetail(id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  created() {
    const query = this.$route.query.q;
    if (query) {
      this.fetchMovies(query);
    }
  }
};
</script>

<style scoped>
.search-results {
  text-align: center;
}

.movie-item {
  display: inline-block;
  margin: 10px;
  cursor: pointer;
}

.movie-poster {
  width: 150px;
  height: auto;
  border-radius: 8px;
}
</style>
