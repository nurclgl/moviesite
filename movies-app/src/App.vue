<template>
  <div id="app">
    <nav>
      <router-link to="/">Ana Sayfa</router-link>
      <router-link to="/favorites">Favorilerim</router-link>
      <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Film Ara..." />
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch() {
      // Yönlendirme ile arama sonuçlarını gösteren sayfaya geçiş yapıyoruz
      this.$router.push({ path: '/search', query: { q: this.searchQuery } });
    }
  }
};
</script>

<style scoped>
/* Genel stil ayarları */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #2C2C2C; /* Arka plan rengi */
  color: #F0F0F0; /* Metin rengi */
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  background-color: #8B0000; /* Navigasyon çubuğu rengi */
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

nav a {
  color: #FFF; /* Yazı rengi */
  text-decoration: none;
  margin: 0 15px;
  font-size: 1.2em;
}

nav a:hover {
  text-decoration: underline;
}

input[type="text"] {
  padding: 5px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  margin-left: 15px;
  flex-grow: 1;
}

h1, h3 {
  color: #FFF;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #8B0000; /* Buton rengi */
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5A0000;
}
</style>

