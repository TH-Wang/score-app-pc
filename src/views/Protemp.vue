<template>
  <div class="list-container">
    <div class="headline">项目</div>
    <div class="box">
      <empty v-if="projects.length === 0" />
      <div v-else class="item" v-for="(item, index) in projects" :key="item.id">
        <cover :src="item._path_cover">
          <div class="handle">
            <div class="handle-button" title="编辑" @click="handleEdit(item, index)"><i class="el-icon-edit-outline" /></div>
            <div class="handle-button" title="统计"><i class="el-icon-data-analysis" /></div>
            <div class="handle-button" title="分享" @click="shareVisible = true"><i class="el-icon-share" /></div>
          </div>
        </cover>
        <div class="title">
          <span :class="item | state('class')">{{item | state('text')}}</span>
          {{item.pname}}
        </div>
      </div>
    </div>

    <div class="headline">模板</div>
    <div class="box">
      <empty v-if="templates.length === 0" />
      <div v-else class="item" v-for="item in templates" :key="item.id" >
        <cover :src="item._path_cover">
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

    <create-dialog
      :title="editProTitle || '标题'"
      tips="已经发布的项目，只能修改基本信息，不能编辑评分项"
      ref="info"
      @submit="editProject"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Empty from '@/components/Empty.vue'
import Cover from '@/components/Cover.vue'
import CreateDialog from '../components/CreateDialog.vue'
import { mapState } from 'vuex'

export default {
  components: { Empty, Cover, CreateDialog },
  data: () => ({
    projects: [],
    templates: [],
    link: 'http://online.score.com/project/detail/score?id=15W615K31l613dm16fkjaWGa',
    shareVisible: false,
    editProTitle: ''
  }),
  computed: {
    ...mapState(['user'])
  },
  filters: {
    state (item, type) {
      const { state, closing } = item
      let res = null
      if (Date.now() > new Date(closing).getTime()) {
        res = { text: '已完成', class: 'state-tag-done' }
        return res[type]
      }

      if (state === 0) res = { text: '待提交', class: 'state-tag-pending' }
      else res = { text: '进行中', class: 'state-tag-doing' }

      return res[type]
    }
  },
  methods: {
    async queryList () {
      const res = await this.$api.project.getOwnProject(this.user.id)
      const { success, data } = res.data
      if (success) {
        const { projects, templates } = data
        this.projects = projects
        this.templates = templates
      }
    },
    handleEdit (item, index) {
      if (item.state === 0) {
        this.linkEdit(item.id)
      } else if (item.state === 1) {
        this.editProTitle = item.pname
        this.$refs.info.setData(cloneDeep(item))
        this.$refs.info.open()
      }
    },
    linkEdit (id) {
      this.$router.push('/project/edit?id=' + id)
    },
    // 修改项目信息
    async editProject (values) {
      const res = await this.$api.project.update(values)
      const { success, data } = res.data
      if (success) {
        this.$refs.info.setData(data)
        this.$message({
          message: '修改成功',
          type: 'success',
          showClose: true
        })
        this.$refs.info.close()
        this.queryList()
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

.state-tag{
  padding: 1px 4px;
  border-radius: 3px;
  // vertical-align: middle;
  color: #fff;
  display: inline-block;
  font-size: 12px;

  &-done{ @extend .state-tag; background-color: #909399 }
  &-doing{ @extend .state-tag; background-color: $primary-color }
  &-pending{ @extend .state-tag; background-color: $warning-color }
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
