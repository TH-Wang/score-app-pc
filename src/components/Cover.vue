<template>
  <div
    class="cover"
    :style="{
      width: size.width,
      height: size.height
    }"
  >
    <div class="image" :style="{'background-image': `url(${src})`}"></div>
    <div class="mask">
      <slot></slot>
    </div>
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
  overflow: hidden;
  position: relative;

  .image{
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    transition: all 0.5s;
    background-repeat: no-repeat;
  }

  .mask{
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    transition: all 0.8s;
    position: relative;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover{
    .image{
      transform: scale(1.1);
    }

    .mask{
      background-color: rgba(0, 0, 0, .4);
    }
  }
}
</style>
