<template>
  <div>
    <App-Bar>
      <AppBarSpacer :width="6" />

      <AppBarSection>
        <KendoButton :fill-mode="'flat'">
          <SvgIcon :icon="menuIcon" size="small" />
        </KendoButton>
      </AppBarSection>

      <AppBarSpacer :width="4" />

      <AppBarSection>
        <SvgIcon :icon="imageIcon" size="xlarge" />
      </AppBarSection>

      <App-Bar-Section>
        <span id="company-logo">Company Logo</span>
      </App-Bar-Section>

      <AppBarSpacer />

      <AppBarSection>
        <SvgIcon :icon="searchIcon" size="large" />
      </AppBarSection>

      <AppBarSpacer :width="2" />

      <AppBarSection>
        <Avatar type="image">
          <img :src="imageUrl" />
        </Avatar>
      </AppBarSection>

      <AppBarSection>
        <div class="profile">
          <div class="name">Forename Surname</div>
          <div class="position">Position</div>
        </div>
      </AppBarSection>
    </App-Bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppBar, AppBarSection, AppBarSpacer, Avatar } from '@progress/kendo-vue-layout';
import { Button } from '@progress/kendo-vue-buttons';
import { menuIcon, imageIcon, searchIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-vue-common';

const NavigationBar = defineComponent({
  components: {
    AppBar,
    AppBarSection,
    AppBarSpacer,
    Avatar,
    KendoButton : Button,
    SvgIcon
  },
  setup() {
    const imageUrl: string = 'https://www.telerik.com/kendo-vue-ui/components/layout/assets/appbar/kendoka-vue.png';

    return {
      imageIcon,
      menuIcon,
      searchIcon,
      imageUrl
    };
  }
});

export default NavigationBar
</script>

<style lang="css" scoped>
#company-logo {
  font-weight: 600;
}

.k-appbar-light {
  background-color: white;
}

.profile {
  font-size: 11px;
  margin-right: 30px;
}

.profile .name {
  font-weight: bold;
}

.profile .position {
  color: #a2a9b2;
}

.k-avatar-solid-primary {
  background-color: transparent;
}
</style>
