<template>
  <div class="home">
    <!-- cover -->
    <div class="cover">
      <div class="content">
        <div class="headline">轻量级、便捷的</div>
        <div class="headline">在线评分系统</div>
      </div>
    </div>

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
  background-image: url(~@/assets/home-cover.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}
.content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.headline{
  font-size: 45px;
  color: #FFFFFF;
  text-align: center;
  letter-spacing: 2px;

  & + &{
    margin-top: 10px;
  }
}
</style>
