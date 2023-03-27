<template>
  <header class="header">
    <Logo />
  </header>
</template>

<script>
import Logo from "./Logo.vue";
export default {
  components: { Logo },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
}
</style>