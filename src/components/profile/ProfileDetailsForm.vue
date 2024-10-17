<template>
  <div id="profile-details-form">
    <JsonForms 
      :data="data"
      :ajv="ajv"
      :schema="schema"
      :uischema="uischema"
      :renderers="renderers"
      :config="{ hideRequiredAsterisk: true }"
      @change="onChange">
    </JsonForms>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, shallowRef } from 'vue';
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue';
import { createAjv, JsonSchema } from '@jsonforms/core';
import { vanillaRenderers } from '@jsonforms/vue-vanilla';
import ajvErrors from 'ajv-errors';
import * as moment from 'moment';

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
  setup() {
    const ajv = shallowRef(ajvInstance);
    const renderers = shallowRef([
      ...vanillaRenderers
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
          format: 'email',
          errorMessage: {
            format: 'Invalid email format'
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
                    minimum: 19
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
      formData.value = event.data;
    };

    return {
      schema,
      uischema: uiSchema,
      data: formData,
      onChange: onFormChange,
      ajv,
      renderers
    };
  }
});

export default ProfileDetailsForm;
</script>