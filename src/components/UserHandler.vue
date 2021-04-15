<template>
  <div class="user">
    <!-- 未登录 -->
    <div class="user-none" v-if="!login">
      <el-link type="primary" href="/auth/login">登录</el-link>
      <el-button
        type="primary"
        size="medium"
        @click="$router.push('/auth/register')"
      >注册</el-button>
    </div>
    <!-- 已登录 -->
    <div class="user-login" v-else>
      <el-button type="primary" @click="login = false">个人空间</el-button>
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
</template>

<script>
export default {
  data: () => ({
    login: false
  })
}
</script>

<style lang="scss" scoped>
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
