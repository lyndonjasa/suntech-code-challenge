<template>
  <Card style="margin: 20px 0;" :type="'error'">
    <CardBody>
      <ul id="error-list">
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </CardBody>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card, CardBody } from "@progress/kendo-vue-layout";

const ErrorCard = defineComponent({
  components: {
    Card,
    CardBody
  },
  props: {
    errors: {
      type: Array<String>,
      required: true
    }
  }
});

export default ErrorCard;
</script>

<style lang="css" scoped>
#error-list {
  color: red;
  font-size: 12px;
}
</style>