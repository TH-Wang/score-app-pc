<template>
<div>
  <project-header title="2020第三季度高管考核评分">
    <template #suffix>
      <el-button type="primary" size="medium">预览</el-button>
    </template>
  </project-header>

  <div class="main">
    <div class="nav-grid"></div>

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
        <i class="el-icon-arrow-left"></i>上一步
      </el-button>
      <el-button type="primary">全部完成</el-button>
      <el-button type="primary" @click="nextStep">
        {{active === items.length - 1 ? '保存并继续' : '下一步'}}
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
  </div>
</div>
</template>

<script>
import { isEmpty } from 'lodash'
import ProjectHeader from '@/components/ProjectHeader'

const _t = () => ({ rate: 0, radio: null, checkbox: [], input: '' })

const _m = () => ({ title: '', type: 0, options: [] })

export default {
  components: { ProjectHeader },
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

        if (this.active === this.items.length - 1) {
          this.items.push(_m())
        }
        this.active++
      } catch (error) {}
    }
  },
  created () {
    // const id = this.$route.query?.id
    const tid = this.$route.query?.tid
    if (tid) {
      // 请求模板数据
    } else {
      this.items.push(_m())
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  margin: 0 auto;
  margin-top: 30px;
  width: 800px;
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
