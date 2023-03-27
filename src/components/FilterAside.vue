<template>
  <div class="filter-aside">
    <h3>Products filter</h3>
    <div class="filter-block">
      <div class="filter-block__title">Choose category:</div>
      <select v-model="currentCategory">
        <option value="all">all</option>
        <option
          v-for="category in categoriesList"
          :value="category"
          :key="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <div class="filter-block">
      <div class="filter-block__title">Set maximum price:</div>
      <div class="price-slider">
        <input
          type="range"
          :min="priceMinMaxValues.min"
          :max="priceMinMaxValues.max"
          step="50"
          v-model="maxPrice"
        />
        <div class="value">({{ maxPrice }}$)</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      currentCategory: "all",
      maxPrice: "1000",
    };
  },
  methods: {
    ...mapMutations(["sortByCategory", "setSortedProducts", "sortByPrice"]),
  },
  watch: {
    currentCategory(newCategory) {
      this.$router
        .push({
          path: "/filter",
          query: { category: newCategory, price: this.maxPrice },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
      if (newCategory !== "all") {
        this.sortByCategory(newCategory);
      } else {
        this.setSortedProducts(this.products);
      }
      this.sortByPrice(this.maxPrice);
    },
    maxPrice(newPrice) {
      this.$router
        .push({
          path: "/filter",
          query: { category: this.currentCategory, price: newPrice },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
      if (this.currentCategory !== "all") {
        this.sortByCategory(this.currentCategory);
      } else {
        this.setSortedProducts(this.products);
      }
      this.sortByPrice(newPrice);
    },
  },
  mounted() {
    this.$router
      .push({
        path: "/filter",
        query: { category: this.currentCategory, price: this.maxPrice },
      })
      .catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      })
      .finally(() => {
        if ("category" in this.$route.query) {
          this.currentCategory = this.$route.query.category;
          if (this.currentCategory !== "all") {
            this.sortByCategory(this.currentCategory);
          } else {
            this.setSortedProducts(this.products);
          }
        }
        if ("price" in this.$route.query) {
          this.maxPrice = this.$route.query.price;
          this.sortByPrice(this.maxPrice);
        }
      });
  },
  computed: {
    categoriesList() {
      return [...new Set(this.products.map((i) => i.category))];
    },
    ...mapState(["products"]),
    priceMinMaxValues() {
      return {
        min: Math.min(...this.products.map((i) => i.price)),
        max: Math.max(...this.products.map((i) => i.price)),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.price-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}
.filter-aside {
  h3 {
    text-transform: uppercase;
    font-size: 20px;
    margin: 0 0 20px;
  }
}
.filter-block {
  margin-bottom: 20px;
  &__title {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
  }
  select {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    text-transform: uppercase;
    font-size: 16px;
  }
}
@media (min-width: 1024px) {
  .filter-aside {
    margin: 0 10px;
    width: calc(30% - 20px);
  }
}
</style>