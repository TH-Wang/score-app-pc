<template>
  <div class="aside">
    <div class="section">
      <div class="title">热门模板</div>
      <div class="item" v-for="(item, index) in hotList" :key="index">
        <cover width="120px" height="80px" />
        <div class="item-info">
          <div class="item-info-name">
            模板标题
          </div>
          <div class="item-info-view">
            点击量 <span>3,927</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="title">为您推荐</div>
      <div class="item" v-for="(item, index) in recommend" :key="index">
        <cover width="120px" height="80px" />
        <div class="item-info">
          <div class="item-info-name">
            模板标题
          </div>
          <div class="item-info-view">
            <i class="el-icon-user"></i> 流川枫
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from '@/components/Cover.vue'

export default {
  components: { Cover },
  data: () => ({
    hotList: new Array(5).fill(''),
    recommend: new Array(3).fill('')
  })
}
</script>

<style lang="scss" scoped>
$item-height: 80px;

.aside{
  padding-left: 20px;
  flex-shrink: 0;
  width: 300px;
  border-left: solid 1px $border-lighter;
  box-sizing: border-box;
}
.section{
  margin-bottom: 30px;
}
.title{
  font-size: 20px;
  font-weight: 900;
  color: $primary-text;
}
.item{
  display: flex;
  align-items: center;
  height: $item-height;
  margin-top: 20px;

  &-info{
    margin-left: 8px;
    flex: 1;
    height: $item-height;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &-name{
      @include ellipse(2);
      font-size: 14px;
      color: $regular-text;
    }

    &-creator{
      font-size: 12px;
      color: $secondary-text;
    }

    &-view{
      font-size: 12px;
      color: $secondary-text;

      span{
        color: $regular-text;
        font-size: 18px;
      }
    }
  }
}
</style>
