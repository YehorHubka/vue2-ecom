<template>
  <div id="app">
    <Header />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: { Header },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
}
.main {
  padding: 40px 15px;
}
</style>
