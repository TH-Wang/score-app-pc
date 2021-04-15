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
.work{
  display: flex;
}
.aside{
  flex-shrink: 0;
}
.main{
  flex: 1;
}
</style>
