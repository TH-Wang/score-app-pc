<template>
  <div class="work">
    <div class="aside">
      <work-aside></work-aside>
    </div>
    <div class="main">
      <work-header></work-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import WorkAside from '@/components/WorkAside.vue'
import WorkHeader from '@/components/WorkHeader.vue'

export default {
  components: { WorkAside, WorkHeader }
}
</script>

<style lang="scss" scoped>
$aside-width: 150px;

.work{
  display: flex;
  height: 100vh;
}
.aside{
  width: $aside-width;
  flex-shrink: 0;
  height: 100%;
}
.main{
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
}
</style>
