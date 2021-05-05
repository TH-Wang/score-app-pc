<template>
  <div class="project_item">
    <div class="title">
      {{ index || record.sort }}、 {{record.title || '这里是标题'}}
    </div>
    <div class="content">
      <el-rate
        v-if="record.type === 0"
        show-text
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        :texts="['极差', '较差', '一般', '良好', '优秀']"
        v-model="val"
        @change="$emit('change', $event)"
      ></el-rate>

      <el-radio-group
        v-else-if="record.type === 1"
        v-model="val"
        @change="$emit('change', $event)"
      >
        <el-radio
          v-for="item in record.options"
          :key="item.value"
          :label="item.value"
          class="block-option"
        >{{item.label}}</el-radio>
      </el-radio-group>

      <el-checkbox-group
        v-else-if="record.type === 2"
        v-model="val"
        @change="handleChange"
      >
        <el-checkbox
          v-for="item in record.options"
          :key="item.value"
          :label="item.value"
          class="block-option"
        >{{item.label}}</el-checkbox>
      </el-checkbox-group>

      <el-input
        v-else
        v-model="val"
        type="textarea"
        :autosize="{ minRows: 2}"
        placeholder="请输入内容"
        @input="handleChange"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Array, Number, String],
      default: null
    },
    index: {
      type: Number,
      default: null
    },
    record: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    val: null
  }),
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    },
    setValue (val) {
      this.val = val
    }
  },
  created () {
    let initVal = null
    switch (this.record.type) {
      case 0: initVal = 0; break
      case 1: initVal = null; break
      case 2: initVal = []; break
      case 3: initVal = ''; break
      default: initVal = null
    }
    this.val = initVal
  }
}
</script>

<style lang="scss" scoped>
.project_item{

  padding: 20px 0;

  & + &{
    border-top: solid 1px $border-light;
  }
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
</style>
