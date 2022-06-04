<template>
  <div>
    <history-meetings/>
  </div>
</template>
<script lang="ts">
import HistoryMeetings from '../components/history-meetings.vue';

export default {
  name: 'ListFilter',
  components: {
    HistoryMeetings,
  },
};
</script>
