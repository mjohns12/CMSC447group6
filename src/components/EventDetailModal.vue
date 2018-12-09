<template>
  <div>
    <b-btn v-b-modal="'event-detail-' + event.id">View</b-btn>
    <b-modal :id="'event-detail-' + event.id"
             :title="'Event #' + event.id + ' Details'">
      <b-tabs card>
        <b-tab title="View Event" no-body active>
          <EventComponent :event="event"/>
        </b-tab>
        <b-tab title="Change Priority">
          <b-form-select v-model="selectedPriority" :options="range(1, 10)" class="mb-3" />
          <b-btn variant="primary" 
                 :disabled="selectedPriority === event.priority"
                 @click="onPriorityChange">
            Change Priority
          </b-btn>
        </b-tab>
      </b-tabs>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Event } from '@/interfaces/Event';
  import EventComponent from './EventComponent.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      EventComponent
    }
  })
  export default class EventDetailModel extends Vue {
    @Prop() private missionid!: number;
    @Prop() private event!: Event;
    private service: Service;
    private selectedPriority: number = this.event.priority;

    constructor() {
      super();
      this.service = new Service();
    }

    private onPriorityChange() {
      this.service.changePriority(this.event, this.selectedPriority);
    }

    private range(start: number, end: number): number[] {
      if (end < start) {
        return [];
      }
      const n = Array(end - start);
      for (let i = 0; i <= end - start; i++) {
        n[i] = start + i;
      }
      return n;
    }
  }
</script>

<style scoped>
  div.interior-button {
    padding: 5px 30px;
  }
</style>