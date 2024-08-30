<template>
  <div class="movie-detail-container" v-if="movie">
    <div class="movie-header">
      <h1>{{ movie.title }}</h1>
      <button @click="toggleFavorite" class="favorite-button">
        <span v-if="isFavorite" class="heart">&#10084;</span>
        <span v-else class="heart">&#9825;</span> 
        {{ isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle' }}
      </button>
    </div>
    <div class="movie-content">
      <img :src="movie.poster" alt="movie.title" class="movie-poster"/>
      <div class="movie-info">
        <p><strong>Yıl:</strong> {{ movie.year }}</p>
        <p><strong>Tür:</strong> {{ movie.genre.join(', ') }}</p>
        <p><strong>Yönetmen:</strong> {{ movie.director }}</p>
        <p><strong>Oyuncular:</strong> {{ movie.actors.join(', ') }}</p>
        <p><strong>Özet:</strong> {{ movie.plot }}</p>
        <p><strong>IMDb Puanı:</strong> {{ movie.rating }}</p>
        <p><strong>Süre:</strong> {{ movie.runtime }} dakika</p>
        <p><strong>Ödüller:</strong> {{ movie.awards }}</p>
        <p><strong>Ülke:</strong> {{ movie.country }}</p>
        <p><strong>Dil:</strong> {{ movie.language }}</p>
        <p><strong>Gişe:</strong> {{ movie.boxOffice }}</p>
        <p><strong>Yapım Şirketi:</strong> {{ movie.production }}</p>
        <a :href="movie.website" target="_blank" class="movie-website">Resmi Web Sitesi</a>
      </div>
    </div>
  </div>
  <div v-else class="loading-container">
    <p>Yükleniyor...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: null,
      isFavorite: false
    };
  },
  methods: {
    async fetchMovie() {
      try {
        const id = this.$route.params.id;
        const response = await fetch(`https://freetestapi.com/api/v1/movies/${id}`);
        this.movie = await response.json();
        this.checkIfFavorite();
      } catch (error) {
        console.error("API Hatası:", error);
      }
    },
    toggleFavorite() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      
      if (this.isFavorite) {
        favorites = favorites.filter(movie => movie.id !== this.movie.id);
        this.isFavorite = false;
      } else {
        favorites.push(this.movie);
        this.isFavorite = true;
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
    },
    checkIfFavorite() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.isFavorite = favorites.some(movie => movie.id === this.movie.id);
    }
  },
  created() {
    this.fetchMovie();
  }
};
</script>

<style scoped>
.movie-detail-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.movie-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5em;
  margin: 0;
  color: #333;
}

.movie-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.movie-poster {
  flex: 1 1 300px;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.movie-info {
  flex: 2 1 400px;
}

.movie-info p {
  margin: 10px 0;
  font-size: 1.1em;
  color: #555;
}

.movie-info strong {
  color: #333;
}

.movie-website {
  display: inline-block;
  margin-top: 10px;
  color: #007BFF;
  text-decoration: none;
}

.movie-website:hover {
  text-decoration: underline;
}

.favorite-button {
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-button .heart {
  font-size: 1.5em;
  margin-right: 8px;
  color: red;
}

.favorite-button:hover {
  background-color: #0056b3;
}

.loading-container {
  text-align: center;
  font-size: 1.5em;
  color: #555;
}

@media (max-width: 768px) {
  .movie-content {
    flex-direction: column;
    align-items: center;
  }
  
  .movie-info {
    text-align: center;
  }
}
</style>
