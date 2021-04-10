<template>
  <div class="home">
    <!-- cover -->
    <div class="cover"></div>

    <search />

    <template-main />

  </div>
</template>

<script>
import Search from './search.vue'
import TemplateMain from './main.vue'

export default {
  components: { Search, TemplateMain }
}
</script>

<style lang="scss" scoped>
.cover{
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
}
</style>
