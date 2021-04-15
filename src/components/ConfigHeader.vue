<template>
  <div class="header">
    <!-- 导航按钮 -->
    <el-tooltip effect="dark" placement="bottom-start" :content="tooltip">
      <div class="nav-button">
        <i v-if="navType === 'home'" class="el-icon-s-home"></i>
        <i v-else-if="navType === 'back'" class="el-icon-back"></i>
        <span v-else></span>
      </div>
    </el-tooltip>

    <!-- 项目标题 -->
    <div class="title">{{title}}</div>

    <slot name="suffix"></slot>
  </div>
</template>

<script>
export default {
  props: {
    navType: {
      type: String,
      default: 'back'
    },
    title: {
      type: String,
      default: '2020年第三季度高管经理业务能力评分'
    }
  },
  computed: {
    tooltip () {
      return this.navType === 'home' ? '回到首页' : '返回'
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 60px;

.header{
  height: $height;
  display: flex;
  align-items: center;
  padding: 0 30px 0 100px;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
  position: relative;
}
.nav-button{
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 24px;
  color: $regular-text;
  border-right: solid 1px $border-light;
  position: absolute;
  left: 0;
  top: ($height - 30px) / 2;
  cursor: pointer;
}
.title{
  flex: 1;
  font-size: 18px;
  text-align: center;
  @include ellipse;
}
</style>
