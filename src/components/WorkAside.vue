<template>
  <div class="container">
    <logo />

    <div class="menu">
      <div class="menu-item" @click="() => { $refs.create.open() }">
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
            <img src="@/assets/icon/project.png" alt="">
          </div>
        </div>
        <div class="menu-item-label">
          <div class="menu-item-title">项目</div>
          <!-- <div class="menu-item-desc">修改 统计 删除</div> -->
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-item-icon">
          <div class="manage-icon">
            <img src="@/assets/icon/manage.png" alt="">
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
            <i class="el-icon-s-tools"></i>
          </div>
        </div>
        <div class="menu-item-label">
          <div class="menu-item-title">设置</div>
          <!-- <div class="menu-item-desc">审核 权限 用户</div> -->
        </div>
      </div>
    </div>

    <create-dialog title="新建" ref="create" @submit="createSubmit" />

  </div>
</template>

<script>
import Logo from '@/components/Logo'
import CreateDialog from '@/components/CreateDialog'
import { mapState } from 'vuex'

export default {
  components: { Logo, CreateDialog },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async createSubmit (values) {
      const userId = this.user.id
      values = Object.assign({}, values, { userId })
      const res = await this.$api.project.create(values)
      const { success, data } = res.data
      if (success) {
        this.$confirm('项目已创建完成，即将开始自定义评分项', '创建成功', {
          showCancelButton: false,
          type: 'success',
          iconClass: 'el-icon-success'
        }).then(() => {
          this.$router.push({ path: '/project/edit', query: { id: data } })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$item-height: 36px;

.container{
  width: 100%;
  height: 100vh;
  padding: 10px 15px;
  box-sizing: border-box;
  // border-right: solid 1px $border-light;
  box-shadow: 1px 0 16px 0 rgba(0, 0, 0, .1);
  background-color: #FFFFFF;
}
// .logo{
//   width: 100%;
//   height: 40px;
//   border-radius: 4px;
//   background-color: #f5f5f5;
// }
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
      // background-color: #fafafa;
      // border-radius: 4px;
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
  border-radius: 10px;
  box-shadow: 1px 2px 6px 0 rgba($color: $primary-color, $alpha: .5);

  i{
    font-size: 16px;
    color: #FFFFFF;
  }
}
// 项目图标
.project-icon{
  @extend .icon;
  // background-color: $primary-lighter-color;

  img{
    width: 100%;
    height: 100%;
  }
}
// 审核图标
.manage-icon{
  @extend .icon;

  img{
    width: 92%;
    height: 92%;
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
