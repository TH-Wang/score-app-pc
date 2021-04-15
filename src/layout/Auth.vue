<template>
  <div class="container">
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container{
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;
  background-image: url(~@/assets/svg/auth-back.svg);
  background-size: 64%;
  background-position: 10% center;
  background-repeat: no-repeat;
}
.main{
  position: fixed;
  right: 10vw;
  top: 50%;
  transform: translateY(-50%);
}
</style>
