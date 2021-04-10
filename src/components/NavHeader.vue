<template>
  <div class="nav-header">
    <div class="nav-fixed">
      <div class="nav-container">
        <!-- Logo -->
        <div class="logo"></div>

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
        <div class="user">
          <!-- 未登录 -->
          <div class="user-none" v-if="!login">
            <el-link type="primary">登录</el-link>
            <el-button type="primary" size="medium">注册</el-button>
          </div>
          <!-- 已登录 -->
          <div class="user-login" v-else>
            <el-button type="primary">个人空间</el-button>
            <el-dropdown placement="bottom-start">
              <div class="user-info">
                <el-avatar size="medium"></el-avatar>
                <span class="user-info-name">
                  用户昵称<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </div>
              <!-- 下拉菜单组件需要自定义 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>账号信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const nav = [
  { label: '模板广场', path: '/index', index: 0 },
  { label: '公开评分', path: '/index', index: 1 },
  { label: '解决方案', path: '/index', index: 2 },
  { label: '会员权益', path: '/index', index: 3 }
]

export default {
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
  margin: 0 20px;

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

.user{
  position: absolute;
  right: 0;

  .el-link, .el-button, &-info{
    margin-right: 20px;
  }

  .flex{
    display: flex;
    align-items: center;
  }

  &-none{
    @extend .flex;
  }

  &-login{
    @extend .flex;
  }

  &-info{
    display: flex;
    align-items: center;
    cursor: pointer;

    &-name{
      margin-left: 8px;
      color: $secondary-text;
    }
  }
}
</style>
