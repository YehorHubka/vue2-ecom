<template>
  <div class="product">
    <div class="product__image">
      <img :src="data.thumbnail" :alt="data.title" />
    </div>
    <div class="product__category">
      Category: <b>{{ data.category }}</b>
    </div>
    <div class="product__title">{{ data.title }}</div>
    <div class="product__price">{{ data.price }}$</div>
    <router-link class="product__link" :to="'/' + data.id"
      >Show more</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="scss" scoped>
.product {
  padding: 15px;
  border-radius: 5px;
  background: #eee;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: 0.3s all ease;
  &:hover {
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.5);
  }
  &__image {
    position: relative;
    height: 200px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      object-fit: cover;
    }
  }
  &__title {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__category {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
    b {
      color: #444;
    }
  }
  &__price {
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 15px;
  }
  &__link {
    display: inline-block;
    padding: 10px 20px;
    background: #444;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    transition: 0.3s all ease;
    &:hover {
      background: #000;
    }
  }
}
</style>