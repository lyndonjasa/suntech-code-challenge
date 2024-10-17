<template>
  <div id="breadcrumbs-container">
    <SvgIcon class="home" :icon="homeIcon" size="small" />
    <div class="separator" v-if="crumbs.length > 0">></div>
    <template v-for="(crumb, index) in crumbs">
      <template v-if="index == activeCrumbIndex">
        <span class="crumb active">{{ crumb }}</span>
      </template>
      <template v-else>
        <span class="crumb">{{ crumb }}</span>
        <div class="separator">/</div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { homeIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-vue-common';
import _ from 'lodash';

const Breadcrumbs = defineComponent({
  components: {
    SvgIcon
  },
  setup() {
    const route = useRoute();
    const crumbs = computed((): string[] => {
      const paths = route.path.split('/').filter(p => p);

      return paths.map(path => _.startCase(path));
    });

    const activeCrumbIndex = computed((): number => {
      return crumbs.value.length - 1
    });

    return {
      crumbs,
      homeIcon,
      activeCrumbIndex
    }
  }
});

export default Breadcrumbs;
</script>

<style lang="css" scoped>
#breadcrumbs-container {
  margin: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.home {
  color: #003366;
}

.crumb {
  color: #414e62;
}

.crumb.active {
  color: black;
  font-weight: 700;
}

.separator {
  margin: 0 10px;
  color: #97a1af;
}
</style>