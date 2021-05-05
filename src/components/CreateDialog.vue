<template>
  <el-dialog
    width="40vw"
    :visible="visible"
    :title="title"
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
      <el-form-item label="封面图片" prop="cover">
        <el-upload
          action="http://localhost:7001/api/v1/upload"
          :headers="{ authorization: token }"
          :show-file-list="false"
          :on-success="handleImage"
        >
          <div
            class="upload-button"
            :style="{'background-image': `url(${previewCover || ''})`}"
          >
            <template v-if="!form.cover">
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
      <el-form-item label="截止时间" prop="closing">
        <el-date-picker
          v-model="form.closing"
          type="datetime"
          placeholder="请选择时间"
          value-format="yyyy-MM-dd HH:mm:ss"
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
import { mapState } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '新建'
    }
  },
  data: () => ({
    visible: false,
    form: {
      pname: '',
      cover: '',
      isTemplate: 0,
      needAuth: 0,
      closing: ''
    },
    previewCover: '',
    rules: {
      pname: [{ required: true, message: '项目名称不能为空' }],
      cover: [{ required: true, message: '请上传封面图片' }],
      closing: [{ required: true, message: '请选择截止时间' }]
    }
  }),
  computed: {
    ...mapState(['token'])
  },
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
    async handleImage (res, file) {
      // const result = await this.$api.upload(file)
      this.form.cover = res.data.filename
      this.previewCover = res.data.filepath
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  i{
    font-size: 22px;
  }

  &:hover, &:active{
    border-color: $primary-color;
    color: $primary-color;
  }
}
</style>
