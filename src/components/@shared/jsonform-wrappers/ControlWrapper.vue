<template>
  <div v-if="visible" :id="id" :class="styles.control.root" class="control-wrapper">
    <label
      :for="id + '-input'"
      :class="[styles.control.label, required ? styles.control.required : '', { 'disabled': disabled }]"
    >
      {{ label }}
      <span v-if="showAsterisk" :class="styles.control.asterisk">*</span>
    </label>
    <div :class="styles.control.wrapper">
      <slot></slot>
    </div>
    <div v-if="showErrors && errors" :class="errors ? styles.control.error : styles.control.description">
      {{ errors }}
    </div>
  </div>
</template>

<script lang="ts">
import { isDescriptionHidden } from '@jsonforms/core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ControlWrapper',
  props: {
    id: {
      required: true,
      type: String,
    },
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },
    appliedOptions: {
      required: false as const,
      type: Object,
      default: undefined,
    },
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    styles: {
      required: true,
      type: Object,
    },
    showErrors: {
      required: false,
      type: Boolean,
      default: false
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription
      );
    },
    showAsterisk(): boolean {
      return this.required && !this.appliedOptions?.hideRequiredAsterisk;
    },
  },
});
</script>

<style scoped lang="css">
.control-wrapper {
  margin: 7px;
  color: black;
  font-size: 12px;
}

.disabled {
  color: #9f9fa0;
}
</style>
