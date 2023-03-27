<template>
  <div class="two-columns" v-if="!loading">
    <FilterAside />
    <div class="products-grid" v-if="!!sortedProducts.length">
      <Card
        v-for="product in sortedProducts"
        :data="product"
        :key="product.id"
      />
    </div>
    <div v-else class="empty-list">
      There are no products by this sort parameters. <br />
      You should choose another.
    </div>
  </div>
  <Loading v-else />
</template>

<script>
import FilterAside from "../components/FilterAside.vue";
import Loading from "../components/Loading.vue";
import Card from "../components/Card.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "HomeView",
  components: { Loading, Card, FilterAside },
  methods: {
    ...mapActions({
      getAllProducts: "getAllProducts",
    }),
  },
  async created() {
    await this.getAllProducts();
  },
  computed: {
    ...mapState(["products", "loading", "sortedProducts"]),
  },
};
</script>

<style lang="scss" scoped>
.empty-list {
  font-size: 20px;
  text-align: center;
}
.products-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
@media (min-width: 1024px) {
  .empty-list {
    margin: 0 10px;
    width: calc(70% - 20px);
  }
  .products-grid {
    width: calc(70% - 20px);
    margin: 0 10px;
  }
  .two-columns {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }
}
</style>
