<template>
  <div class="nav-header">
    <div class="nav-fixed">
      <div class="nav-container">
        <!-- Logo -->
        <logo />

        <!-- nav -->
        <div class="menu">
          <div
            :class="{
              'menu-item': true,
              'menu-item-active': item.index === active
            }"
            v-for="item in nav"
            :key="item.index"
            @click="() => { handleChangeNav(item) }"
          >{{item.label}}</div>
        </div>

        <!-- project -->

        <!-- user -->
        <user-handler />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import UserHandler from './UserHandler.vue'
const nav = [
  { label: '模板广场', path: '/index', index: 0 },
  { label: '公开评分', path: '/index', index: 1 },
  { label: '解决方案', path: '/index', index: 2 },
  { label: '会员权益', path: '/index', index: 3 }
]

export default {
  components: { Logo, UserHandler },
  data: () => ({
    nav,
    active: 0,
    login: true
  }),
  methods: {
    handleChangeNav (target) {
      const { index, path } = target

      if (this.active === index) return
      this.active = index

      if (this.$route.path === path) return
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 60px;

.nav-header::before{
  content: '';
  display: block;
  height: 60px;
}
.nav-fixed{
  width: 100%;
  border-bottom: solid 1px $border-lighter;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.nav-container{
  width: $main-width;
  margin: 0 auto;
  height: $nav-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo{
  width: 120px;
  height: 40px;
  border-radius: 6px;
  background-color: #f5f5f5;
}
.menu{
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 20px 0 50px;

  &-item{
    color: $secondary-text;
    width: 100px;
    height: $nav-height;
    line-height: $nav-height;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  &-item-active{
    color: $primary-color;
    font-weight: 900;
  }
  &-item::selection {
    background-color: transparent;
  }
  &-item::-moz-selection {
    background-color: transparent;
  }
  &-item::-webkit-selection {
    background-color: transparent;
  }
}

</style>
