<template>
  <div class="page-404">
    <h1>Page not found 404</h1>
    <router-link to="/">Go to main page</router-link>
  </div>
</template>

<style lang="scss" scoped>
.page-404 {
  padding: 100px 0;
  text-align: center;
  h1 {
    font-size: 50px;
    margin: 0 0 50px;
  }
  a {
    font-size: 20px;
    font-weight: bold;
    color: #666;
    transition: 0.3s all ease;
    &:hover {
      color: #000;
    }
  }
}
</style>