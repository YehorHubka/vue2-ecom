<template>
  <div class="logo">
    <img src="@/assets/logo.png" width="40" alt="" class="logo__icon" />
    <div class="logo__text">E-commerce site</div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  &__text {
    font-weight: bold;
    font-size: 20px;
  }
  &__icon {
    display: block;
  }
}
</style>