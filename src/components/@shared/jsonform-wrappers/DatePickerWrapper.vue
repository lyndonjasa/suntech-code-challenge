<template>
  <control-wrapper
    v-bind="controlWrapper"
    :showErrors="showErrors"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <kendo-datepicker
      :id="control.id + '-input'"
      :class="[styles.control.input, 'input-wrapper', { 'error-text': hasErrors && showErrors }]"
      :value="dateValue"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false; showErrors = true">
    </kendo-datepicker>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isDateControl,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps
} from '@jsonforms/vue';
import ControlWrapper from './ControlWrapper.vue';
import { useVanillaControl } from '@jsonforms/vue-vanilla';
import { DatePicker } from '@progress/kendo-vue-dateinputs';
import { computed, ref } from 'vue';
import moment from 'moment';

const controlRenderer = defineComponent({
  name: 'DateControlRenderer',
  components: {
    ControlWrapper,
    'kendo-datepicker': DatePicker
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

    const overrideChange = (event: Event) => {
      showErrors.value = true;
      event.target.value = moment(event.target.value).format('YYYY-MM-DD');
      onChange(event);
    };

    const dateValue = computed((): Date => {
      return new Date(vanillaControl.control.value.data);
    });

    return {
      ...restAttr,
      hasErrors,
      controlWrapper,
      onChange: overrideChange,
      showErrors,
      dateValue
    };
  }
});

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(3, isDateControl),
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