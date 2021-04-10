<template>
  <div class="container">
    <div class="main">
      <div class="list">
        <div
          class="list-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <div
            class="list-item-cover"
            :style="{
              'background-image': 'url()'
            }"
          >
            <div class="mask"></div>
          </div>
          <div class="list-item-title">
            {{index % 2 === 0 ? '2021年第三季度部门经理工作满意度评分' : '模板标题'}}
          </div>
          <div class="list-item-info">
            <span class="list-item-info-creator">
              <i class="el-icon-user"></i> 创建者
            </span>
            <span class="list-item-info-view">
              <i class="el-icon-view"></i> 999+
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="aside"></div>
  </div>
</template>

<script>
const list = new Array(20).fill('')

export default {
  data: () => ({
    list
  }),
  filters: {
    ellipse: val => {
      if (val.length > 10) return val.slice(0, 10) + '...'
      else return val
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: $main-width;
  margin: 50px auto 0;
  display: flex;
}
.main{
  width: 900px;
  overflow: auto;
  flex: 1;
}
.aside{
  flex-shrink: 0;
  width: 300px;
  border-left: solid 1px $border-lighter;
  box-sizing: border-box;
  height: 500px;
  background-color: #FAFAFA;
}

.list{
  display: flex;
  flex-wrap: wrap;

  &-item{
    margin-bottom: 40px;
    margin-right: 25px;
    width: 200px;

    &-cover{
      height: 120px;
      background-color: #FAFAFA;
      border-radius: 6px;
      cursor: pointer;
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
      transition: all 0.5s;
      overflow: hidden;

      &:hover{
        background-size: 130%;
      }
    }

    &-title{
      margin-top: 5px;
      font-size: 14px;
      height: 40px;
      color: $primary-text;
      @include ellipse(2);
      cursor: pointer;
      transition: color 0.2s;

      &:hover{
        color: $secondary-text;
      }
    }

    &-info{
      margin-top: 3px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;

      &-creator{
        @include ellipse;
        flex: 1;
        cursor: pointer;
        transition: color 0.2s;
        color: $secondary-text;

        &:hover{
          color: $placeholder;
        }
      }

      &-view{
        color: $regular-text;
        flex-shrink: 0;
      }
    }
  }
}

.mask{
  width: 100%;
  height: 100%;
  transition: all 0.5s;

  &:hover{
    // box-shadow: inset 0 0 50px 10px rgba($color: #000000, $alpha: .5);
    background-color: rgba($color: #000000, $alpha: .2);
  }
}
</style>
