
<template>
  <b-card no-body :header="'<b>Event ID: </b>' + event.id">
    <b-container>
      <b-row>
        <b-col class="no-padding">
          <div class="event-titles">Priority</div>
          <div>{{ event.priority }}</div>
        </b-col>
        <b-col class="no-padding"
               cols="5">
          <div class="event-titles">Location</div>
          <div>{{ location }}</div>
        </b-col>
        <b-col class="no-padding">
          <div class="event-titles">Status</div>
          <div v-if="mostRecentStatus">{{ mostRecentStatus.status }}</div>
          <div v-if="!mostRecentStatus">Unknown</div>
        </b-col>
      </b-row>
    </b-container>
    <div class="footer" slot="footer"><slot/></div>
  </b-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Event, EventStatus, EventStatusType } from '@/interfaces/Event';
  import Icon from 'vue-awesome/components/Icon.vue';

  @Component({
    components: {
      Icon
    }
  })
  export default class EventComponent extends Vue {
    @Prop() private event!: Event;
    @Prop() private buttons!: any;

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
  .no-padding {
    padding: 0;
  }
  .no-padding > div {
    padding: 0 4px;
  }
  .event-titles {
    background: #f7f7f7;
    font-weight: bolder;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin: 0 3px;
  }
</style>