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
import { defineComponent, ref } from 'vue';
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue';
import { createAjv, JsonSchema } from '@jsonforms/core';
import { vanillaRenderers } from '@jsonforms/vue-vanilla';
import ajvErrors from 'ajv-errors';

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
    const ajv = ajvInstance;
    const renderers = [
      ...vanillaRenderers
    ];

    const schema: JsonSchema = {
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
    };

    const uiSchema = {
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
            effect: 'SHOW',
            condition: {}
          }
        }
      ]
    };

    const formData = ref<FormData>({
      age: 0,
      birthDate: new Date().toISOString().substring(0, 10),
      email: undefined,
      foreName: undefined,
      lastName: undefined
    });

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

<style lang="css" scoped>
#profile-details-form {
  font-size: 12px;
}
</style>