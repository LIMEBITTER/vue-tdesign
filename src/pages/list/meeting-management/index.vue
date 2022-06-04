<template>
  <div>
    <unplayed-meetings/>
  </div>
</template>
<script lang="ts">
import UnplayedMeetings from '../components/unplayed-meetings.vue';

export default {
  name: 'ListFilterAll',
  components: {
    UnplayedMeetings,
  },
};
</script>
