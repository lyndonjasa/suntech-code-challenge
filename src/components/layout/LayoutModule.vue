<template>
  <NavigationBar />
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './NavigationBar.vue';

const LayoutModule = defineComponent({
  components: {
    NavigationBar
  }
});

export default LayoutModule;
</script>