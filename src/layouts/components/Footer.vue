<template>
<!--  <div :class="prefix + '-footer'">Copyright @ 2021-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</div>-->
  <div :class="prefix + '-footer'">嘉心糖会议签到系统</div>


</template>

<script lang="ts">
import { prefix } from '@/config/global';
import Vue from 'vue';

export default Vue.extend({
  name: `${prefix}-footer`,
  data() {
    return {
      prefix,
    };
  },
});
</script>
<style lang="less" scoped>
@import '@/style/variables';

.@{prefix}-footer {
  color: @text-color-placeholder;
  line-height: 20px;
  text-align: center;
}
</style>
