<template>
  <Drawer :items="menuItems.map((item, index) => ({
          ...item,
          selected: index === 1, // explicit 1
        }))"
    position="start" :mode="'push'" :mini="true" :expanded="false">
    <DrawerContent>
      <slot></slot>
    </DrawerContent>
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Drawer, DrawerContent  } from "@progress/kendo-vue-layout";
import { clipboardTextIcon, gearIcon } from '@progress/kendo-svg-icons';

const SideNav = defineComponent({
  components: {
    Drawer,
    DrawerContent
  },
  setup() {
    const menuItems = ref([
        {
          text: ""
        },
        {
          text: "Details",
          svgIcon: clipboardTextIcon,
          selected: true,
          data: {
            path: "/",
          },
        },
        {
          text: "Settings",
          svgIcon: gearIcon,
          data: {
            path: "/",
          },
        }]);

    return {
      menuItems
    }
  }
});

export default SideNav;
</script>

<style lang="css">
.k-drawer-item {
  color: #a8afb9;
}

.k-drawer-item:hover {
  color: #3D3D3D;
  background-color: transparent;
}

.k-drawer-item.k-selected, .k-drawer-item.k-selected:hover{
  background-color: transparent;
  color: #355d85;
}

.k-drawer-item.k-selected .k-svg-icon {
  background-color: rgba(53, 93, 133, 0.10);
  border-radius: 100px;
}

.k-drawer-container {
  height: calc(100vh - 48px);
}

.k-drawer-content {
  height: 100%;
}
</style>
