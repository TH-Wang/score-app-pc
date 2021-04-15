<template>
  <div
    class="cover"
    :style="{
      width: size.width,
      height: size.height,
      'background-image': `url(${src})`
    }"
  >
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '200px'
    },
    height: {
      type: [String, Number],
      default: '120px'
    }
  },
  computed: {
    size () {
      const { width, height } = this
      const w = typeof width === 'number' ? width + 'px' : width
      const h = typeof height === 'number' ? height + 'px' : height
      return { width: w, height: h }
    }
  }
}
</script>

<style lang="scss" scoped>
.cover{
  height: 120px;
  background-color: #FAFAFA;
  border-radius: 6px;
  cursor: pointer;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  transition: all 0.5s;
  overflow: hidden;

  .mask{
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
  }

  &:hover{
    background-size: 130%;

    .mask{
      background-color: rgba(0, 0, 0, .2);
    }
  }
}
</style>
