<template>
  <div class="empty">
    <img src="@/assets/svg/empty.svg" alt="">
    <p>什么都没有~</p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty{
  width: 200px;
  // height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img{
    width: 120px;
  }
  p{
    margin-top: 5px;
    color: $secondary-text;
    font-size: 14px;
  }
}
</style>
