<template>
  <div class="card">
    <div class="title">
      <span
        :class="{'title-active': active === 0}"
        @click="active !== 0 ? active = 0 : void 0"
      >账号注册</span>
      <a class="split">/</a>
      <span
        :class="{'title-active': active === 1}"
        @click="active !== 1 ? active = 1 : void 0"
      >邮箱注册</span>
    </div>

    <!-- 主体 -->
    <el-form class="main">
      <template v-if="active === 0">
        <el-input
          class="input"
          placeholder="用户名"
          v-model="form.username"
          clearable
        ></el-input>
        <el-input
          class="input"
          type="password"
          placeholder="密码"
          v-model="form.password"
          clearable
        ></el-input>
        <el-input
          class="input"
          type="checkPwd"
          placeholder="确认密码"
          v-model="form.password"
          clearable
        ></el-input>
      </template>
      <template v-else>
        <el-input
          class="input"
          placeholder="电子邮箱"
          v-model="form.email"
          clearable
        ></el-input>
        <el-input
          class="input"
          type="text"
          placeholder="验证码"
          v-model="form.code"
          clearable
        >
          <span slot="append" style="cursor: pointer">获取验证码</span>
        </el-input>
      </template>
    </el-form>

    <!-- 提交 -->
    <div class="login-button">注册</div>
    <div
      class="reg-button"
      @click="$router.replace('/auth/login')"
    >已有账号？立即登录</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 0,
    form: {
      username: '',
      password: '',
      checkPwd: '',
      email: '',
      code: ''
    }
  })
}
</script>

<style lang="scss" scoped>
.card{
  width: 360px;
  height: auto;
  padding: 20px 30px;
  box-sizing: border-box;
  // background-color: #FFFFFF;
  // border-radius: 3px;
  // box-shadow: 0 0px 20px 0px rgba($color: #000000, $alpha: .05);
}
.title{
  height: 50px;
  line-height: 50px;
  color: $secondary-text;
  font-size: 18px;

  &-active{
    color: $primary-text;
    font-weight: bold;
    font-size: 24px;
  }

  span{
    cursor: pointer;
    transition: all 0.3s;
  }

  .split{
    color: $regular-text;
    margin: 0 5px;
    font-size: 16px;
  }
}

.main{
  margin-top: 20px;

  .input{
    margin-top: 30px;
  }
}

.login-button, .reg-button{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  transition: all .3s;
}

.login-button{
  margin-top: 50px;
  background-color: $primary-color;
  color: #FFFFFF;
  border-radius: 2px;
}
.login-button:hover{
  background-color: $primary-hover-color;
}
.reg-button{
  border: solid 1px $primary-color;
  box-sizing: border-box;
  color: $primary-color;
  margin: 20px 0 30px;
  border-radius: 2px;
}
.reg-button:hover{
  border-color: $primary-hover-color;
  color: $primary-hover-color;
}
</style>
