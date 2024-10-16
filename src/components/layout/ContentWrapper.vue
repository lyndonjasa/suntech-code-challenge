<template>
  <div class="content">
    <slot></slot>
  </div>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<style lang="css">
.content {
  height: calc(100% - 75px);
  width: 100%;
  background-color: #f9fafb;
  padding: 0 200px;
}

.footer {
  border-top: 3px solid #eeeff0;
  width: 100%;
  height: 75px;
  padding: 0 200px;
}
</style>