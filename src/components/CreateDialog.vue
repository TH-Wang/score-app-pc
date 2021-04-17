<template>
  <el-dialog
    width="40vw"
    :visible="visible"
    title="新建"
    @close="visible = false"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="90px"
    >
      <!-- pname -->
      <el-form-item label="项目名称" prop="pname" required>
        <el-input v-model="form.pname" placeholder="请输入项目名称" />
      </el-form-item>
      <!-- cover -->
      <el-form-item label="封面图片">
        <el-upload
          action=""
          :show-file-list="false"
          :before-upload="beforeUpload"
        >
          <div
            class="upload-button"
            :style="{'background-image': form.cover || ''}"
          >
            <template v-show="!form.cover">
              <i class="el-icon-plus"></i>
              <span>上传图片</span>
            </template>
          </div>
        </el-upload>
      </el-form-item>
      <!-- isTemplate -->
      <el-form-item label="项目类型" required>
        <el-radio-group v-model="form.isTemplate">
          <el-radio :label="0">项目</el-radio>
          <el-radio :label="1">模板</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- needAuth -->
      <el-form-item label="权限设置" required>
        <el-radio-group v-model="form.needAuth">
          <el-radio :label="0">公开</el-radio>
          <el-radio :label="1">私密</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- closing -->
      <el-form-item label="截止时间">
        <el-date-picker
          v-model="form.closing"
          type="datetime"
          placeholder="请选择时间"
        />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitCreate">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  data: () => ({
    visible: false,
    form: {
      pname: '',
      cover: '',
      isTemplate: 0,
      needAuth: 0,
      closing: ''
    },
    rules: {
      pname: [{ required: true, message: '项目名称不能为空' }]
    }
  }),
  methods: {
    async submitCreate () {
      try {
        await this.$refs.form.validate()
        this.$emit('submit', cloneDeep(this.form))
      } catch (error) {}
    },
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    beforeUpload (file) {
      console.log(file)
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-button{
  width: 160px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: dashed 1px $border-base;
  border-radius: 4px;
  color: $secondary-text;
  box-sizing: border-box;
  padding-top: 10px;

  i{
    font-size: 22px;
  }

  &:hover, &:active{
    border-color: $primary-color;
    color: $primary-color;
  }
}
</style>
