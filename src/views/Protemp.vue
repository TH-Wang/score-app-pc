<template>
  <div class="list-container">
    <div class="headline">项目</div>
    <div class="box">
      <empty v-if="projects.length === 0" />
      <div v-else class="item" v-for="item in projects" :key="item.id">
        <cover :src="item.cover">
          <div class="handle">
            <div class="handle-button" title="编辑"><i class="el-icon-edit-outline" /></div>
            <div class="handle-button" title="统计"><i class="el-icon-data-analysis" /></div>
            <div class="handle-button" @click="shareVisible = true" title="分享"><i class="el-icon-share" /></div>
          </div>
        </cover>
        <div class="title">{{item.pname}}</div>
      </div>
    </div>

    <div class="headline">模板</div>
    <div class="box">
      <empty v-if="templates.length === 0" />
      <div v-else class="item" v-for="item in templates" :key="item.id" >
        <cover :src="item.cover">
          <div class="handle">
            <div class="handle-button" title="编辑"><i class="el-icon-edit-outline" /></div>
            <div class="handle-button" title="统计"><i class="el-icon-data-analysis" /></div>
            <div class="handle-button" title="分享"><i class="el-icon-share" /></div>
          </div>
        </cover>
        <div class="title">{{item.pname}}</div>
      </div>
    </div>

    <el-dialog
      width="400px"
      :visible="shareVisible"
      title="分享"
      @close="shareVisible = false"
    >
      <el-input v-model="link">
        <template #append>
          <el-button>复制</el-button>
        </template>
      </el-input>
      <p style="margin-top:20px">点击复制，快快将链接发给你的好友吧~</p>
    </el-dialog>
  </div>
</template>

<script>
import Empty from '@/components/Empty.vue'
import Cover from '@/components/Cover.vue'
import { mapState } from 'vuex'

export default {
  components: { Empty, Cover },
  data: () => ({
    projects: [],
    templates: [],
    link: 'http://online.score.com/project/detail/score?id=15W615K31l613dm16fkjaWGa',
    shareVisible: false
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async queryList () {
      const res = await this.$api.project.getOwnProject(this.user.id)
      const { success, data } = res.data
      if (success) {
        const { projects, templates } = data
        this.projects = projects
        this.templates = templates
      } else {
        this.$message({
          type: 'warning',
          message: '拉取项目失败，请稍后再试',
          showClose: true
        })
      }
    }
  },
  created () {
    this.queryList()
  }
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

  .item{
    width: 200px;
  }

  .title{
    @include ellipse(2);
    margin-top: 8px;
  }
}
.handle{
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #FFF;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;

  &-button{
    flex: 1;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 2px;
    transition: all 0.3s;
    transform: translateY(-30px);
    opacity: 0;

    &:hover{
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  &:hover &-button{
    transform: translateY(0);
    opacity: 1;
  }

}
</style>
