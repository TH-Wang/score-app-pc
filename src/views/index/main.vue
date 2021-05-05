<template>
  <div class="container">
    <div class="main">
      <div class="list">
        <list-item
          v-for="item in list"
          :key="item.id"
          :record="item"
          @click="linkDetail(item.id)"
        />
      </div>
    </div>
    <template-aside></template-aside>
  </div>
</template>

<script>
import ListItem from './list-item.vue'
import TemplateAside from './aside.vue'

export default {
  components: { ListItem, TemplateAside },
  props: {
    keyword: {
      type: String,
      default: ''
    },
    tag: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    list: [],
    page: 1,
    size: 12,
    lastPage: 0
  }),
  filters: {
    ellipse: val => {
      if (val.length > 10) return val.slice(0, 10) + '...'
      else return val
    }
  },
  methods: {
    async queryList () {
      const { page, size, keyword, tag } = this
      const data = { page, size, keyword }
      if (tag > 0) data.tag = tag
      const res = await this.$api.project.getTemplates(data)
      const { rows, lastPage } = res.data.data
      this.list = rows
      this.lastPage = lastPage
      this.page++
    },
    linkDetail (id) {
      this.$router.push({ path: '/project/detail/temp', query: { id } })
    }
  },
  created () {
    this.queryList()
  },
  watch: {
    keyword () {
      this.page = 1
      this.queryList()
    },
    tag () {
      this.page = 1
      this.queryList()
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
