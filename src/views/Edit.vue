<template>
<div>
  <project-header :title="project.pname || ''">
    <template #suffix>
      <el-button type="text" style="margin-right:15px" @click="$refs.info.open()">
        <i class="el-icon-edit-outline"></i>
        项目信息
      </el-button>
      <el-button type="primary" size="medium" @click="linkPreview">预览</el-button>
    </template>
  </project-header>

  <div class="main">
    <div class="nav-grid">
      <p>共 <span>{{items.length}}</span> 个评分项：</p>
      <div class="nav-grid-box">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          :class="{
            'nav-grid-item': true,
            'nav-grid-active': active === index
          }"
          @click="active = index"
        >{{index+1}}</div>
      </div>
    </div>

    <div class="preview">
      <div class="title">{{active + 1}}、 {{current.title || '这里是标题'}}</div>
      <div class="content">
        <el-rate
          v-show="current.type === 0"
          show-text
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          :texts="['极差', '较差', '一般', '良好', '优秀']"
          v-model="test.rate"
        ></el-rate>

        <el-radio-group
          v-show="current.type === 1"
          v-model="test.radio"
        >
          <el-radio
            v-for="item in current.options"
            :key="item.value"
            :label="item.value"
            class="block-option"
          >{{item.label}}</el-radio>
        </el-radio-group>

        <el-checkbox-group
          v-show="current.type === 2"
          v-model="test.checkbox"
        >
          <el-checkbox
            v-for="item in current.options"
            :key="item.value"
            :label="item.value"
            class="block-option"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>

        <el-input
          v-show="current.type === 3"
          v-model="test.input"
          type="textarea"
          :autosize="{ minRows: 2}"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>

    <div class="config">
      <el-form
        label-width="60px"
        label-position="left"
        :model="current"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="标题" prop="title">
          <el-input style="width: 600px" v-model="items[active].title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="方式" prop="type">
          <el-select
            style="width: 200px"
            v-model="items[active].type"
            @change="handleSelectChange"
          >
            <el-option label="打分" :value="0"></el-option>
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="文本输入" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="current.type === 1 || current.type === 2"
          label="选项"
          prop="options"
          required
        >
          <div class="options">
            <div
              class="options-item"
              v-for="(option, idx) in items[active].options"
              :key="option.value"
            >
              <el-input
                style="width:300px"
                v-model="option.label"
                :placeholder="`第${idx+1}个选项`"
              ></el-input>
              <span
                v-if="idx > 1"
                class="remove"
                @click="removeOption(idx)"
              ><i class="el-icon-close"></i></span>
            </div>
            <el-button size="small" @click="addOption(1)">添加选项</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="footer">
      <el-button v-show="active > 0" @click="prevStep">
        <i class="el-icon-arrow-left"></i>上一项
      </el-button>
      <el-button type="primary" @click="handleRelease">完成并发布</el-button>
      <el-button type="primary" @click="nextStep">
        下一项
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
  </div>

  <create-dialog title="编辑" ref="info" @submit="editProject" />
</div>
</template>

<script>
import { isEmpty, cloneDeep } from 'lodash'
import ProjectHeader from '@/components/ProjectHeader'
import CreateDialog from '../components/CreateDialog.vue'

const _t = () => ({ rate: 0, radio: null, checkbox: [], input: '' })

const _m = () => ({ title: '', type: 0, options: [], id: Date.now() })

export default {
  components: { ProjectHeader, CreateDialog },
  data: vm => {
    const _v = (rule, val, cb) => {
      if (vm.current.type !== 1 && vm.current.type !== 2) {
        cb()
        return
      }
      if (!val.length) cb(new Error('请输入选项值'))
      else {
        let flag = true
        for (let i = 0; i < val.length; i++) {
          if (isEmpty(val[i].label)) {
            cb(new Error('所有选项值均不能为空'))
            flag = false
            break
          }
        }
        flag && cb()
      }
    }
    return {
      projectId: null,
      project: {},
      // 当前评分项的索引
      active: 0,
      // 检测项目
      items: [],
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '必须选择一种评分方式', trigger: 'blur' }],
        options: [{ validator: _v, trigger: 'blur' }]
      },
      // options的唯一值
      uid: 0,
      // 即时预览用于双向绑定的测试值
      test: _t()
    }
  },
  computed: {
    current () {
      return this.items[this.active]
    }
  },
  methods: {
    // 请求项目信息和评分项数据
    async initDatas () {
      // 请求评分项数据
      const itemsRes = await this.$api.items.getItems(this.projectId)
      const list = itemsRes.data.data
      if (list.length) {
        this.items = list
        this.active = list.length - 1
      }
      // 请求项目基本信息
      const projectRes = await this.$api.project.detail(this.projectId)
      this.$refs.info.setData(projectRes.data.data)
      this.project = cloneDeep(projectRes.data.data)
    },
    // 跳转预览页面
    linkPreview () {
      this.$router.push('/project/detail/preview?id=' + this.projectId)
    },
    // 添加选项
    addOption (count) {
      count = count || 1
      let i = 0
      while (i < count) {
        const newId = this.uid++
        this.items[this.active].options.push({ value: newId, label: '' })
        i++
      }
    },
    // 删除选项
    removeOption (idx) {
      this.items[this.active].options.splice(idx, 1)
    },
    // 评分方式选择框发生改变
    handleSelectChange (val) {
      if ((val === 1 || val === 2) && this.current.options.length === 0) {
        this.addOption(2)
      }
    },
    // 上一步
    prevStep () {
      this.active--
    },
    // 下一步
    async nextStep () {
      try {
        // 表单验证
        const valid = await this.$refs.form.validate()
        if (!valid) return

        const data = cloneDeep(this.current)

        if (this.active === this.items.length - 1) {
          this.items.push(_m())
          this.createItem(data)
        } else {
          this.updateItem(data)
        }
        this.active++
      } catch (error) {}
    },
    // 修改项目信息
    async editProject (values) {
      const res = await this.$api.project.update(values)
      const { success, data } = res.data
      if (success) {
        this.$refs.info.setData(data)
        this.project = cloneDeep(data)
        this.notify('修改成功')
        this.$refs.info.close()
      }
    },
    // 发布项目
    async handleRelease () {
      const res = await this.$api.project.release(this.projectId)
      if (res.data.success) {
        this.$message({
          message: '发布成功',
          type: 'success',
          showClose: true
        })
        this.$router.go(-1)
      }
    },
    // 添加评分项
    async createItem ({ id, ...data }) {
      const projectId = Number(this.projectId)
      data = Object.assign({}, data, { projectId })
      const res = await this.$api.items.create(data)
      if (res.data.success) {
        this.notify()
      }
    },
    // 更新评分项
    async updateItem (data) {
      const res = await this.$api.items.update(data)
      if (res.data.success) {
        this.notify()
      }
    },
    // 实时保存的提示
    notify (title) {
      this.$notify({
        title: title || '实时保存成功',
        duration: 1500,
        type: 'success'
      })
    }
  },
  async created () {
    this.items.push(_m())

    const id = this.$route.query?.id
    this.projectId = id
    if (typeof id !== 'undefined') {
      this.initDatas()
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  margin: 0 auto;
  margin-top: 30px;
  width: 800px;
  position: relative;
}
.nav-grid{
  $size: 20px;
  $count: 5;
  width: ($size + 10px + 2px) * $count;
  position: absolute;
  top: 0;
  left: calc(100% + 20px);

  & > p {
    margin-bottom: 10px;

    span{
      color: $primary-color;
      font-weight: bold;
    }
  }

  &-box{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &-item{
    margin: 0 10px 10px 0;
    width: $size;
    height: $size;
    line-height: $size;
    text-align: center;
    font-size: 12px;
    border: solid 1px $placeholder;
    cursor: pointer;

    &:hover{
      border-color: $primary-color;
      color: $primary-color;
    }
  }

  &-active{
    border-color: $primary-color;
    background-color: $primary-color;
    color: #FFFFFF;

    &:hover{
      color: #FFFFFF;
    }
  }
}
.preview{
  border-bottom: dashed 2px #eee;
  padding-bottom: 30px;
}
.title{
  font-size: 18px;
  margin-bottom: 20px;
}
.content{
  padding-left: 36px;
}
.block-option{
  display: block;

  & + & {
    margin-top: 20px;
  }
}
.config{
  margin-top: 60px;
}
.options{
  display: inline-block;

  &-item{
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    .remove{
      margin-left: 10px;
      font-size: 14px;
      color: $secondary-text;
      cursor: pointer;
    }
  }
}
.footer{
  width: 100%;
  margin: 80px 0;
  text-align: center;
}
</style>
