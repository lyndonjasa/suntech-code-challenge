<template>
  <control-wrapper
    v-bind="controlWrapper"
    :showErrors="showErrors"
    :styles="styles"
    :disabled="!control.enabled"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <kendo-textbox
      :id="control.id + '-input'"
      :class="[styles.control.input, 'input-wrapper', { 'error-text': hasErrors && showErrors }]"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="placeholder"
      @input="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false; showErrors = true">
    </kendo-textbox>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isStringControl,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps
} from '@jsonforms/vue';
import ControlWrapper from './ControlWrapper.vue';
import { useVanillaControl } from '@jsonforms/vue-vanilla';
import { Input } from '@progress/kendo-vue-inputs';
import { computed, ref } from 'vue';

const controlRenderer = defineComponent({
  name: 'StringControlRenderer',
  components: {
    ControlWrapper,
    'kendo-textbox': Input
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const vanillaControl = useVanillaControl(
      useJsonFormsControl(props),
      (target) => target.value || undefined
    );

    const { onChange, controlWrapper, ...restAttr } = vanillaControl;
    const showErrors = ref<boolean>(false);

    const hasErrors = computed((): boolean => {
      return controlWrapper.value.errors;
    });

    const placeholder = computed((): string => {
      return 'Type';
    });

    const overrideChange = (event: Event) => {
      showErrors.value = true;
      onChange(event);
    };


    return {
      ...restAttr,
      placeholder,
      hasErrors,
      controlWrapper,
      onChange: overrideChange,
      showErrors
    };
  }
});

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isStringControl),
};

export default controlRenderer;

</script>

<style lang="css" scoped>
.input-wrapper {
  margin: 2px;
}

.error-text {
  border-color: red;
}
</style>