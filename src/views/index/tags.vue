<template>
  <div class="tags-container">
    <tag-item
      v-for="(item, index) in tags"
      :key="index"
      :active="value"
      :field="index"
      @click="$emit('change', $event)"
    >{{item}}</tag-item>
  </div>
</template>

<script>
const item = {
  props: {
    active: { type: Number, default: 0 },
    field: { type: Number, default: 0 }
  },
  render (h) {
    const { field, active } = this.$props
    const _this_ = this
    return h(
      'div',
      {
        class: {
          'tag-item': true,
          'tag-active': field === active
        },
        on: {
          click: () => { _this_.$emit('click', field) }
        }
      },
      this.$slots.default
    )
  }
}

export default {
  components: { 'tag-item': item },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    tags: ['全部', '员工打分', '教学评价', '问卷调查', '投票评选']
  })
}
</script>

<style lang="scss" scoped>
.tags-container{
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
}
.tag-item{
  padding: 8px 20px;
  border-radius: 30px;
  background-color: #f5f5f5;
  cursor: pointer;

  & + & {
    margin-left: 20px;
  }
}
.tag-active{
  background-color: $primary-lighter-color;
  font-weight: bold;
  color: $primary-color;
}
</style>
