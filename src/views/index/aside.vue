<template>
  <div class="aside">
    <div class="section">
      <div class="title">热门模板</div>
      <div class="item" v-for="item in hotList" :key="item.id">
        <cover :src="item.cover" width="120px" height="80px" />
        <div class="item-info">
          <div class="item-info-name">
            {{item.title}}
          </div>
          <div class="item-info-view">
            点击量 <span>{{item.hits | number}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="title">为您推荐</div>
      <div class="item" v-for="item in recommend" :key="item.id">
        <cover :src="item.cover" width="120px" height="80px" />
        <div class="item-info">
          <div class="item-info-name">
            {{item.title}}
          </div>
          <div class="item-info-view">
            <i class="el-icon-user"></i> {{item.creator}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from '@/components/Cover.vue'
const list = [
  { id: 3, title: '重庆财经学院青年志愿者协会上半年整体工作对外评分', cover: 'https://images.unsplash.com/photo-1607128400152-06c00b09e3b5?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8YWV1NnJMLWo2ZXd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', creator: '李女士', hits: '97851' },
  { id: 1, title: '第三季度物业、清洁及安保管理工作评分', cover: 'https://images.unsplash.com/photo-1618424581570-fa7eb30f3766?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fGFldTZyTC1qNmV3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', creator: '王小明', hits: '12098' },
  { id: 2, title: '2021融智智能工作室设计工作总结评分', cover: 'https://images.unsplash.com/photo-1618506469810-282bef2b30b3?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8YWV1NnJMLWo2ZXd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', creator: '刘女士', hits: '15367' }
]

export default {
  components: { Cover },
  data: () => ({
    hotList: list,
    recommend: list
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
        margin-left: 5px;
        color: $regular-text;
        font-size: 18px;
      }
    }
  }
}
</style>
