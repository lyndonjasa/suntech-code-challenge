<template>
  <Card class="expandable-card">
    <CardBody>
      <CardTitle>
        <div class="expandable-card-header">
          <slot name="header"></slot>
          <SvgIcon class="expand-button primary-text" @click="onExpandCollapse" :icon="expand ? chevronUpIcon : chevronDownIcon" />
        </div>
      </CardTitle>
      <div class="expandable-card-body" v-show="expand">
        <slot></slot>
      </div>
    </CardBody>
    </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Card, CardBody, CardTitle } from "@progress/kendo-vue-layout";
import { chevronUpIcon, chevronDownIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-vue-common';

const ExpandableCard = defineComponent({
  components: {
    Card,
    CardTitle,
    CardBody,
    SvgIcon
  },
  props: {
    expandOnLoad: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  setup(props) {
    const expand = ref<boolean>(props.expandOnLoad);

    const onExpandCollapse = () => {
      expand.value = !expand.value;
    };

    return {
      expand,
      onExpandCollapse,
      chevronUpIcon,
      chevronDownIcon
    }
  }
});

export default ExpandableCard;
</script>

<style lang="css" scoped>
.expandable-card-header {
  display: flex;
  justify-content: space-between;
}

.expand-button {
  cursor: pointer;
}
</style>