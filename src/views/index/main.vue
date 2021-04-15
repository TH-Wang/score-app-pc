<template>
  <div class="container">
    <div class="main">
      <div class="list">
        <list-item
          v-for="(item, index) in list"
          :key="index"
        />
      </div>
    </div>
    <template-aside></template-aside>
  </div>
</template>

<script>
import ListItem from './list-item.vue'
import TemplateAside from './aside.vue'
const list = new Array(20).fill('')

export default {
  components: { ListItem, TemplateAside },
  data: () => ({
    list
  }),
  filters: {
    ellipse: val => {
      if (val.length > 10) return val.slice(0, 10) + '...'
      else return val
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: $main-width;
  margin: 50px auto 0;
  display: flex;
}
.main{
  width: 900px;
  overflow: auto;
  flex: 1;
}

.list{
  display: flex;
  flex-wrap: wrap;
}
</style>
