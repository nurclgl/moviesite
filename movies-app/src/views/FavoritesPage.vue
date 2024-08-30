<template>
  <div class="favorites-container">
    <h1>Favorilerim</h1>
    <div v-if="favorites.length" class="favorites-list">
      <div v-for="movie in favorites" :key="movie.id" class="favorite-item">
        <img :src="movie.poster" alt="movie.title" class="favorite-poster"/>
        <h3>{{ movie.title }}</h3>
        <button @click="removeFromFavorites(movie.id)">Favorilerden Çıkar</button>
      </div>
    </div>
    <div v-else class="no-favorites">
      <p>Favori film bulunmuyor.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: []
    };
  },
  methods: {
    fetchFavorites() {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.favorites = storedFavorites;
    },
    removeFromFavorites(id) {
      this.favorites = this.favorites.filter(movie => movie.id !== id);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  },
  created() {
    this.fetchFavorites();
  }
};
</script>

<style scoped>
.favorites-container {
  padding: 20px;
  
  border-radius: 8px;
}

.favorites-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.favorite-item {
  flex: 1 1 200px;
  max-width: 200px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
}

.favorite-poster {
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.no-favorites {
  text-align: center;
  color: #FFF;
}
</style>
