<template>
  <div class="container">
    <div class="logo"></div>

    <div class="menu">
      <div class="menu-item" @click="visible = true">
        <div class="menu-item-icon">
          <div class="create-icon">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div class="menu-item-label">
          <div class="menu-item-title">新建</div>
          <!-- <div class="menu-item-desc">模板 在线评分</div> -->
        </div>
      </div>
      <div class="menu-item-active">
        <div class="menu-item-icon">
          <div class="project-icon">
            <i class="el-icon-folder-checked"></i>
          </div>
        </div>
        <div class="menu-item-label">
          <div class="menu-item-title">项目</div>
          <!-- <div class="menu-item-desc">修改 统计 删除</div> -->
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-item-icon">
          <div class="project-icon">
            <i class="el-icon-coordinate"></i>
          </div>
        </div>
        <div class="menu-item-label">
          <div class="menu-item-title">审核</div>
          <!-- <div class="menu-item-desc">审核 权限 用户</div> -->
        </div>
      </div>

      <div class="menu-item menu-item-end">
        <div class="menu-item-icon">
          <div class="setting-icon">
            <i class="el-icon-setting"></i>
          </div>
        </div>
        <div class="menu-item-label">
          <div class="menu-item-title">设置</div>
          <!-- <div class="menu-item-desc">审核 权限 用户</div> -->
        </div>
      </div>
    </div>

    <el-dialog
      width="40vw"
      :visible="visible"
      title="新建"
      @close="visible = false"
    >
      <el-form
        ref="form"
        :model="createForm"
        :rules="createRules"
        label-position="left"
        label-width="80px"
      >
        <!-- pname -->
        <el-form-item label="项目名称" prop="pname" required>
          <el-input v-model="createForm.pname" placeholder="请输入项目名称" />
        </el-form-item>
        <!-- cover -->
        <el-form-item label="封面图片">
          <el-upload
            action=""
            :show-file-list="false"
          >
            <el-image
              style="width:200px;height:200px"
              :src="createForm.cover"
              fit="scale-down"
            />
            <el-button type="primary" size="small">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <!-- isTemplate -->
        <el-form-item label="项目类型" required>
          <el-radio-group v-model="createForm.isTemplate">
            <el-radio :label="1">模板</el-radio>
            <el-radio :label="0">评分项目</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- needAuth -->
        <el-form-item label="权限设置" required>
          <el-radio-group v-model="createForm.needAuth">
            <el-radio :label="0">公开</el-radio>
            <el-radio :label="1">私密</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- closing -->
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="createForm.closing"
            type="datetime"
            placeholder="请选择时间"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitCreate">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: true,
    createForm: {
      pname: '',
      cover: '',
      isTemplate: 0,
      needAuth: 0,
      closing: ''
    },
    createRules: {
      pname: [{ required: true, message: '项目名称不能为空' }]
    }
  }),
  methods: {
    async submitCreate () {
      try {
        await this.$refs.form.validate()
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
$aside-width: 150px;
$item-height: 36px;

.container{
  width: $aside-width;
  height: 100vh;
  padding: 10px 15px;
  box-sizing: border-box;
  // border-right: solid 1px $border-light;
  box-shadow: 1px 0 16px 0 rgba(0, 0, 0, .1);
}
.logo{
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: #f5f5f5;
}
.menu{
  height: calc(100% - 60px);
  margin-top: 10px;
  width: 100%;
  position: relative;

  &-item{
    width: 100%;
    height: $item-height + 16px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 4px;
    box-sizing: border-box;
    transition: background-color 0.3s;

    &:hover{
      background-color: #fafafa;
    }

    &-active{
      @extend .menu-item;
      background-color: #fafafa;

      &:hover{
        background-color: #fafafa;
      }
    }

    &-end{
      position: absolute;
      bottom: 0;
    }

    &-icon{
      flex-shrink: 0;
      width: $item-height;
      height: $item-height;
      background-color: #fafafa;
      border-radius: 4px;
    }

    &-label{
      margin-left: 10px;
      height: $item-height;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    &-title{
      font-size: 16px;
      color: $regular-text;
    }

    &-desc{
      font-size: 12px;
      color: $secondary-text;
    }
  }
}

.icon{
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
// 新建图标
.create-icon{
  @extend .icon;
  background-color: $primary-color;
  box-shadow: 1px 2px 6px 0 rgba($color: $primary-color, $alpha: .5);

  i{
    font-size: 16px;
    color: #FFFFFF;
  }
}
// 项目图标
.project-icon{
  @extend .icon;
  background-color: $primary-lighter-color;

  i{
    font-size: 18px;
    color: $primary-color;
    // color: #FFFFFF;
  }
}
// 设置图标
.setting-icon{
  @extend .icon;

  i{
    color: $regular-text;
    font-size: 21px;
  }
}
</style>
