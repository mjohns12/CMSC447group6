
<template>
  <div class="row">
    <div>ID: {{ event.id }}</div>
    <div>Priority: {{ event.priority }}</div>
    <div>Location: {{ location }}</div>
    <div v-if="mostRecentStatus">Status: {{ mostRecentStatus.status }}</div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Event, EventStatus, EventStatusType } from '@/interfaces/Event';

  @Component
  export default class EventComponent extends Vue {
    @Prop() private event!: Event;

    get location(): string {
        return this.event.streetNum + ' ' + this.event.street + ' ' + this.event.city + ' ' + this.event.state;
    }

    get mostRecentStatus(): EventStatus {
      if (this.event.statuses.length) {
        return this.event.statuses.reduce((newestStatus, status): EventStatus => {
          return status.time > newestStatus.time ? status : newestStatus;
        });
      } else {
        return {
          time: new Date(),
          status: EventStatusType.pending
        };
      }
    }
  }

</script>

<style scoped>
  div.row {
    display: flex;
    margin: 10px 0;
    border: 2px solid #dfdfdf;
    border-radius: 10px;
    padding: 10px;
  }

  .row > div {
    flex: 1 1 auto;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    margin: 2px;
  }
</style>