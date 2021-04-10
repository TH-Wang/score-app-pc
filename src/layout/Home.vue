<template>
  <div>
    <nav-header />
    <router-view />
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
  components: { NavHeader }
}
</script>
