<template>
  <NavigationBar />
  <SideNav>
    <slot></slot>
  </SideNav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './NavigationBar.vue';
import SideNav from './SideNav.vue';

const LayoutModule = defineComponent({
  components: {
    NavigationBar,
    SideNav
  }
});

export default LayoutModule;
</script>