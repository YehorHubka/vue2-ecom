<template>
  <div class="product-info">
    <router-link class="go-back-link" to="/">Back to catalog</router-link>
    <div class="product-info__image">
      <div class="product-info__image">
        <img :src="productInfo.thumbnail" :alt="productInfo.title" />
      </div>
      <div class="product-info__category">
        Brand: <b>{{ productInfo.brand }}</b>
      </div>
      <div class="product-info__title">{{ productInfo.title }}</div>
      <div class="product-info__price">{{ productInfo.price }}$</div>
      <div class="product-info__description">
        {{ productInfo.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      productInfo: null,
    };
  },
  created() {
    this.productInfo = this.products.find((i) => i.id == this.$route.params.id);
  },
  computed: {
    ...mapState(["products"]),
  },
};
</script>

<style lang="scss" scoped>
.go-back-link {
  display: inline-block;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #666;
  transition: 0.3s all ease;
  &:hover {
    color: #000;
  }
}
.product-info {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  &__image {
    margin-bottom: 15px;
    img {
      width: 100%;
    }
  }
  &__title {
    font-size: 30px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  &__category {
    margin-bottom: 15px;
  }
  &__price {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  &__description {
    font-size: 20px;
  }
}
</style>