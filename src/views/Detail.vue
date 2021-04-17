<template>
  <div>
    <project-header
      title="2020第三季度高管考核评分"
      :nav-type="mode === 'score' ? 'home' : 'back'"
    >
      <template #suffix>
        <el-button
          v-if="mode === 'temp'"
          type="primary"
          size="medium"
          @click="() => { $refs.create.open() }"
        >
          立即使用
        </el-button>
      </template>
    </project-header>

    <div class="main">
      <project-item
        v-for="(item, index) in projects"
        :key="item.id"
        v-model="results[index].result"
        :record="item"
        ref="items"
      />
    </div>

    <div class="footer" v-if="mode === 'score'">
      <el-button type="primary" @click="getResult">完成并提交</el-button>
    </div>

    <create-dialog ref="create" @submit="createSubmit" />
  </div>
</template>

<script>
import ProjectHeader from '@/components/ProjectHeader'
import ProjectItem from '@/components/ProjectItem'
import CreateDialog from '@/components/CreateDialog'

const options = () => [
  { label: '很好', value: 0 },
  { label: '良好', value: 1 },
  { label: '一般', value: 2 },
  { label: '较差', value: 3 }
]

export default {
  components: { ProjectHeader, ProjectItem, CreateDialog },
  data: () => ({
    // 页面类型，score:评分，temp:模板详情，preview:预览
    mode: '',
    active: 0,
    projects: [
      { id: 0, type: 0, title: '是否存在', sort: 0, options: options() },
      { id: 1, type: 2, title: '是否存在', sort: 1, options: options() },
      { id: 2, type: 1, title: '是否存在', sort: 2, options: options() },
      { id: 3, type: 2, title: '是否存在', sort: 3, options: options() },
      { id: 4, type: 1, title: '是否存在', sort: 4, options: options() },
      { id: 5, type: 3, title: '是否存在', sort: 5, options: options() }
    ],
    results: []
  }),
  methods: {
    initResult () {
      this.results = this.projects.map(item => {
        let initVal = null
        switch (item.type) {
          case 0: initVal = 0; break
          case 1: initVal = 0; break
          case 2: initVal = []; break
          case 3: initVal = ''; break
          default: initVal = null
        }
        return { id: item.id, result: initVal }
      })
    },
    handleChange (val, index) {
      console.log(val, index)
      this.$set(this.results, index, Object.assign({}, this.results[index], { result: val }))
    },
    getResult () {
      console.log(this.$refs.items)
      console.log(this.results)
    },
    createSubmit (data) {
      console.log(data)
    }
  },
  created () {
    this.initResult()
    const { type } = this.$route.params
    this.mode = type
  }
}
</script>

<style lang="scss" scoped>
.main{
  margin: 0 auto;
  margin-top: 30px;
  width: 800px;
}
.footer{
  margin: 30px 0;
  text-align: center;
}
</style>
