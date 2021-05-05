<template>
  <div class="logo" @click="$router.push('/index')">
    <img src="@/assets/logo5.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo{
  width: 120px;
  height: 36px;
  cursor: pointer;

  img{
    width: 100%;
    height: 100%;
  }
}
</style>
