<template>
  <div class="search">
    <div class="search-main">
      <div class="search-input">
        <i class="el-icon-search icon"></i>
        <input type="text" placeholder="您想寻找什么，搜索能够更快的帮助到您...">
      </div>
      <div class="search-button">搜 索</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$search-width: 1000px;
$search-height: 60px;
$search-font: 17px;
$search-font-space: 1px;

.search{
  height: $search-height / 2;

  &-main{
    width: $search-width;
    height: $search-height;
    margin: 0 auto;
    transform: translateY(-50%);
    background-color: #FFFFFF;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0 18px 0 rgba($color: #000000, $alpha: .1);
    display: flex;
    align-items: center;
  }

  &-input{
    flex: 1;
    display: flex;
    align-items: center;

    .icon{
      margin: 0 15px 0 20px;
      font-size: 24px;
      color: $regular-text;
    }

    input{
      flex: 1;
      font-size: $search-font;
      letter-spacing: $search-font-space;
      font-weight: 100;
      border: none;
      height: $search-height;
      line-height: $search-height;
      outline: none;

      &::placeholder{
        color: $placeholder;
      }
    }
  }

  &-button{
    flex-shrink: 0;
    width: 120px;
    height: $search-height;
    line-height: $search-height;
    text-align: center;
    background-color: $primary-color;
    color: #FFFFFF;
    font-size: $search-font;
    letter-spacing: $search-font-space;
    cursor: pointer;
  }
}
</style>
