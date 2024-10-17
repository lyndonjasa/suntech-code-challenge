<template>
  <div id="profile-details-form">
    <JsonForms 
      :data="data"
      :ajv="ajv"
      :schema="schema"
      :uischema="uischema"
      :renderers="renderers"
      :config="{ hideRequiredAsterisk: true }"
      :i18n="{ translateError: showErrorMessage }"
      @change="onChange">
    </JsonForms>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, shallowRef } from 'vue';
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue';
import { createAjv, JsonSchema, ErrorTranslator } from '@jsonforms/core';
import { vanillaRenderers } from '@jsonforms/vue-vanilla';
import ajvErrors from 'ajv-errors';
import { ErrorObject } from 'ajv';
import moment from 'moment';
import _ from 'lodash';
import { entry as inputRenderer } from '../@shared/jsonform-wrappers/InputWrapper.vue';
import { entry as datePickerRenderer } from '../@shared/jsonform-wrappers/DatePickerWrapper.vue';

const ajvInstance = createAjv({ useDefaults: true });
ajvErrors(ajvInstance);

interface FormData {
  foreName: string;
  lastName: string;
  birthDate: string;
  email: string;
  age: number;
}

const ProfileDetailsForm = defineComponent({
  components: {
    JsonForms
  },
  emits: ['form-update'],
  setup(props, context) {
    const ajv = shallowRef(ajvInstance);
    const renderers = shallowRef([
      ...vanillaRenderers,
      inputRenderer,
      datePickerRenderer
    ]);

    const schema = shallowRef<JsonSchema>({
      type: 'object',
      properties: {
        forename: {
          type: 'string',
          pattern: '^(?!\\s*$).+',
          errorMessage: {
            pattern: 'Forename cannot be an empty string'
          }
        },
        surname: {
          type: 'string',
          pattern: '^(?!\\s*$).+',
          errorMessage: {
            pattern: 'Surname cannot be an empty string'
          }
        },
        birthDate: {
            type: 'string',
            format: 'date'
        },
        email: {
          type: 'string',
          pattern: '^((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$',
          errorMessage: {
            pattern: 'Please enter a valid Email address'
          }
        },
        age: {
          type: 'number'
        }
      },
      required: ['forename', 'surname', 'email']
    });

    const uiSchema = shallowRef({
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/forename',
                  label: 'Forename(s)'
                },
                {
                  type: 'Control',
                  scope: '#/properties/surname',
                }
              ]
            }
          ],
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/birthDate',
            },
            {
              type: 'Control',
              scope: '#/properties/email',
              rule: {
                effect: 'SHOW',
                condition: {
                  scope: '#/properties/age',
                  schema: {
                    minimum: 18
                  }
                }
              }
            }
          ]
        },
        {
          type: 'Control',
          scope: '#/properties/age',
          rule: {
            effect: 'HIDE',
            condition: {}
          }
        }
      ]
    });

    const showErrorMessage = (error: ErrorObject): string => {
      try {
        if (error.keyword === 'required') {
          const property = error.params.missingProperty;
          return `${_.startCase(property)} is required`
        } else {
          return error.message;
        }
      } catch (e) {
        console.error(e);
        return error.message;
      }
    }

    const formData = ref<FormData>({
      age: 0,
      birthDate: new Date().toISOString().substring(0, 10),
      email: undefined,
      foreName: undefined,
      lastName: undefined
    });

    watch(() => formData.value.birthDate, (currentValue) => {
      const now = moment(Date.now());
      const birthDate = moment(currentValue);

      const ageValue = moment.duration(now.diff(birthDate));
      formData.value.age = Math.floor(ageValue.asYears());
    }, { deep: true });

    const onFormChange = (event: JsonFormsChangeEvent) => {
      let isFormValid = event.errors.length === 0;
      formData.value = event.data;

      context.emit('form-update', {
        ...formData.value,
        isFormValid
      });
    };

    return {
      schema,
      uischema: uiSchema,
      data: formData,
      onChange: onFormChange,
      showErrorMessage,
      ajv,
      renderers
    };
  }
});

export default ProfileDetailsForm;
</script>