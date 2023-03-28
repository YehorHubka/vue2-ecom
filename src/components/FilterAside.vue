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
          step="1"
          v-model="maxPrice"
        />
        <div class="value">({{ maxPrice }}$)</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VueRouter from "vue-router";
export default {
  data() {
    return {
      currentCategory: "all",
      maxPrice: "1000",
    };
  },
  methods: {
    ...mapMutations(["sortByCategory", "setSortedProducts", "sortByPrice"]),
    filterChange() {
      const { isNavigationFailure, NavigationFailureType } = VueRouter;
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
        .catch((failure) => {
          if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
            showToast("Filter routing");
          }
        })
        .finally(() => {
          if ("category" in this.$route.query && "price" in this.$route.query) {
            let params = {
              category: this.$route.query.category,
              price: this.$route.query.price,
            };
            localStorage.setItem("params", JSON.stringify(params));
          }

          this.currentCategory = JSON.parse(
            localStorage.getItem("params") || "{}"
          ).category;
          this.currentCategory !== "all"
            ? this.sortByCategory(this.currentCategory)
            : this.setSortedProducts(this.products);
          this.maxPrice = JSON.parse(
            localStorage.getItem("params") || "{}"
          ).price;
          this.sortByPrice(this.maxPrice);
        });
    },
  },
  watch: {
    currentCategory() {
      this.filterChange();
    },
    maxPrice() {
      this.filterChange();
    },
  },
  created() {
    let storageParams = JSON.parse(localStorage.getItem("params") || "{}");
    let isEmpty = !Object.keys(storageParams).length;
    if (!isEmpty) {
      this.currentCategory = JSON.parse(
        localStorage.getItem("params") || "{}"
      ).category;
      this.maxPrice = JSON.parse(localStorage.getItem("params") || "{}").price;
    }
  },
  mounted() {
    this.filterChange();
  },
  computed: {
    categoriesList() {
      return [...new Set(this.products.map((i) => i.category))];
    },
    ...mapState(["products"]),
    priceMinMaxValues() {
      let values = this.products.map((i) => i.price);
      return {
        min: Math.min(...values),
        max: Math.max(...values),
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