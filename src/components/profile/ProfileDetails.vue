<template>
  <ContentWrapper>
    <Breadcrumbs />

    <div class="header-text">Profile Detail</div>
    <Card style="margin: 20px 0;" :type="'info'">
      <CardBody>This is the personal information you use to access and manage your account. Your email address will be used for account security, recovery, and notifications.</CardBody>
    </Card>

    <Card>
      <CardBody>
        <CardTitle class="header-text">Details</CardTitle>
        <ProfileDetailsForm @form-update="onFormUpdate" />
      </CardBody>
    </Card>

    <template v-slot:footer>
      <div class="form-footer">
        <KButton id="next-button" class="primary-button" :disabled="!isFormValid">
          Next <SvgIcon :icon="arrowRightIcon" size="large" />
        </KButton>
      </div>
    </template>
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ContentWrapper from '../layout/ContentWrapper.vue';
import { Card, CardBody, CardTitle } from "@progress/kendo-vue-layout";
import { Button as KButton } from "@progress/kendo-vue-buttons";
import { arrowRightIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-vue-common';
import ProfileDetailsForm from './ProfileDetailsForm.vue';
import Breadcrumbs from '../@shared/Breadcrumbs.vue';

const ProfileDetails = defineComponent({
  components: {
    ContentWrapper,
    Card,
    CardBody,
    CardTitle,
    KButton,
    SvgIcon,
    ProfileDetailsForm,
    Breadcrumbs
  },
  setup() {
    const isFormValid = ref<boolean>(false);
    const onFormUpdate = (event: any) => {
      isFormValid.value = event.isFormValid;
    };

    return {
      arrowRightIcon,
      onFormUpdate,
      isFormValid
    }
  }
});

export default ProfileDetails;
</script>

<style lang="css">
.k-card {
  color: #003366;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

#next-button {
  font-size: 13px;
  padding: 12px 18px;
  border-radius: 1000px;
}
</style>