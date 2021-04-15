<template>
<div>
  <config-header title="2020第三季度高管考核评分">
    <template #suffix>
      <el-button type="primary" size="medium">预览</el-button>
    </template>
  </config-header>

  <div class="main">
    <div class="preview">
      <div class="title">{{active + 1}}、 {{configForm.title || '这里是标题'}}</div>
      <div class="content">
        <el-rate
          v-show="configForm.type === 0"
          show-text
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          :texts="['极差', '较差', '一般', '良好', '优秀']"
          v-model="test.rate"
        ></el-rate>

        <el-radio-group
          v-show="configForm.type === 1"
          v-model="test.radio"
        >
          <el-radio
            v-for="item in configForm.options"
            :key="item.value"
            :label="item.value"
            class="block-option"
          >{{item.label}}</el-radio>
        </el-radio-group>

        <el-checkbox-group
          v-show="configForm.type === 2"
          v-model="test.checkbox"
        >
          <el-checkbox
            v-for="item in configForm.options"
            :key="item.value"
            :label="item.value"
            class="block-option"
          >{{item.label}}</el-checkbox>
        </el-checkbox-group>

        <el-input
          v-show="configForm.type === 3"
          v-model="test.input"
          type="textarea"
          :autosize="{ minRows: 2}"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>

    <div class="config">
      <el-form :model="configForm" :rules="rules" label-width="60px" label-position="left">

        <el-form-item label="标题">
          <el-input style="width: 600px" v-model="configForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="方式">
          <el-select style="width: 200px" v-model="configForm.type">
            <el-option label="打分" :value="0"></el-option>
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="文本输入" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="configForm.type === 1 || configForm.type === 2"
          label="选项"
        >
          <div class="options">
            <div
              class="options-item"
              v-for="(option, idx) in configForm.options"
              :key="option.value"
            >
              第{{idx+1}}个：
              <el-input
                style="width:300px"
                v-model="option.label"
                placeholder="请输入该选项内容"
              ></el-input>
              <span
                v-if="idx > 1"
                class="remove"
                @click="removeOption(idx)"
              ><i class="el-icon-close"></i></span>
            </div>
            <el-button
              style="margin-left:50px"
              size="small"
              @click="addOption(1)"
            >添加选项</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="footer">
      <el-button>
        <i class="el-icon-arrow-left"></i>上一步
      </el-button>
      <el-button type="primary">全部完成</el-button>
      <el-button type="primary">
        保存并继续<i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
  </div>
</div>
</template>

<script>
import ConfigHeader from '@/components/ConfigHeader'

const initTest = () => ({
  rate: 0,
  radio: 0,
  checkbox: [],
  input: ''
})

export default {
  components: { ConfigHeader },
  data: () => ({
    active: 0,
    items: [{
      type: 0
    }],
    configForm: {
      title: '',
      type: 0,
      options: []
    },
    rules: {},
    uid: 0,
    test: initTest()
  }),
  computed: {
    current () {
      return this.items[this.active]
    }
  },
  methods: {
    handleChange (val) {
      const newData = Object.assign({}, this.items[this.active], { test: val })
      this.$set(this.items, this.active, newData)
    },
    addOption (count) {
      count = count || 1
      let i = 0
      while (i < count) {
        const newId = this.uid++
        this.configForm.options.push({ value: newId, label: '' })
        i++
      }
    },
    removeOption (idx) {
      this.configForm.options.splice(idx, 1)
    }
  },
  created () {
    window.DATA = this.test
  },
  watch: {
    'configForm.type': function (newVal) {
      if (newVal !== 1 && newVal !== 2) return
      if (this.configForm.options.length === 0) {
        this.addOption(2)
      }
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
