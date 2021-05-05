<template>
  <div class="card">
    <div class="title">
      <span
        :class="{'title-active': active === 0}"
        @click="active !== 0 ? active = 0 : void 0"
      >账号登录</span>
      <a class="split">/</a>
      <span
        :class="{'title-active': active === 1}"
        @click="active !== 1 ? active = 1 : void 0"
      >邮箱登录</span>
    </div>

    <!-- 主体 -->
    <el-form class="main" ref="form" :model="form" :rules="rulse">
      <template v-if="active === 0">
        <el-form-item prop="username">
          <el-input
            class="input"
            placeholder="用户名"
            v-model="form.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input"
            type="password"
            placeholder="密码"
            v-model="form.password"
            clearable
          ></el-input>
        </el-form-item>
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
    <div class="login-button" @click="login">登录</div>
    <div
      class="reg-button"
      @click="$router.replace('/auth/register')"
    >没有账号？立即注册</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 0,
    form: {
      username: '',
      password: '',
      email: '',
      code: ''
    },
    rulse: {
      username: [{ required: true, message: '请输入用户名' }],
      password: [
        { required: true, message: '请输入密码' },
        { min: 8, message: '密码至少8位', trigger: 'blur' }
      ]
    }
  }),
  methods: {
    async login () {
      await this.$refs.form.validate()
      const { username, password } = this.form
      const res = await this.$api.user.loginByPwd({ username, password })
      const { data, success, message } = res.data
      if (success) {
        this.$message({
          type: 'success',
          message: '登录成功',
          showClose: true
        })
        const { token, ...rest } = data
        this.$store.commit('setToken', token)
        this.$store.commit('setUser', rest)
        this.$router.push('/index')
      } else {
        this.$message({
          type: 'warning',
          message: message,
          showClose: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  width: 360px;
  height: auto;
  padding: 20px 30px;
  box-sizing: border-box;
  // background-color: #fff;
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
    margin-top: 10px;
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
