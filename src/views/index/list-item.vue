<template>
  <div class="list-item" @click="$emit('click')">
    <cover :src="record.cover" width="100%" height="120px" />
    <div class="list-item-title">
      {{record.pname}}
    </div>
    <div class="list-item-info">
      <span class="list-item-info-creator">
        <i class="el-icon-user"></i> {{record.creator}}
      </span>
      <span class="list-item-info-view">
        <i class="el-icon-view"></i> {{record.hits | number}}
      </span>
    </div>
  </div>
</template>

<script>
import Cover from '@/components/Cover.vue'

export default {
  components: { Cover },
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item{
  margin-bottom: 40px;
  margin-right: 25px;
  width: 200px;

  &-title{
    margin-top: 5px;
    font-size: 14px;
    height: 40px;
    color: $primary-text;
    @include ellipse(2);
    cursor: pointer;
    transition: color 0.2s;

    &:hover{
      color: $secondary-text;
    }
  }

  &-info{
    margin-top: 3px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;

    &-creator{
      @include ellipse;
      flex: 1;
      cursor: pointer;
      transition: color 0.2s;
      color: $secondary-text;

      &:hover{
        color: $placeholder;
      }
    }

    &-view{
      color: $regular-text;
      flex-shrink: 0;
    }
  }
}

.mask{
  width: 100%;
  height: 100%;
  transition: all 0.5s;

  &:hover{
    // box-shadow: inset 0 0 50px 10px rgba($color: #000000, $alpha: .5);
    background-color: rgba($color: #000000, $alpha: .2);
  }
}
</style>
