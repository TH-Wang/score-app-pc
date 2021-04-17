<template>
  <div class="list-container">
    <div class="headline">项目</div>
    <div class="box">
      <div class="item" v-for="item in commonList" :key="item.id">
        <cover :src="item.src" />
        <div class="title">{{item.title}}</div>
      </div>
    </div>

    <div class="headline">模板</div>
    <div class="box">
      <div class="item" v-for="item in tempList" :key="item.id" >
        <cover :src="item.src" />
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Cover from '@/components/Cover.vue'

export default {
  components: { Cover },
  data: () => ({
    commonList: [
      { id: 0, title: '2020第一学期辅导员评分', src: '' },
      { id: 1, title: '2019年志愿社整体工作评分', src: '' }
    ],
    tempList: [
      { id: 2, title: '公司高管季度工作评分', src: '' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.list-container{
  margin: 30px 0 0 50px;
}
.headline{
  display: inline-block;
  margin-bottom: 30px;
  position: relative;
  font-size: 16px;
  font-weight: bold;

  &::after{
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background-color: $regular-text;
  }
}
.box{
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .item + .item{
    margin-left: 30px;
  }

  .title{
    margin-top: 8px;
  }
}
</style>
