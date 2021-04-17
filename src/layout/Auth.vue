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
  // background-image: url(https://images.unsplash.com/photo-1615120962332-df823e51551a?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzM3xhZXU2ckwtajZld3x8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=300);
  // background-image: url(https://images.unsplash.com/photo-1592312040171-267aa90d4783?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI0N3xhZXU2ckwtajZld3x8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=300);
  background-image: url(~@/assets/auth-bg.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.main{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
