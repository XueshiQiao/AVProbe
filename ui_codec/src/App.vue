<script setup>
import Header from "./components/Header.vue";
</script>

<script>
export default {
  created() {
  },
  data() {
  }
}
</script>

<template>
  <!-- <header>
  </header> -->
  <div style="width: 100%">
    <Header />
  </div>
  <!-- <main> -->
  <!-- <Header></Header> -->
  <!-- <TableViewAnt /> -->
  <!-- </main> -->
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 60px;
  max-width: 100%;
  min-width: 100%;
}

/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
