<template>
  <div>
    <div class="interior-button">
      <b-btn block v-b-modal.new-event>Add Event</b-btn>
    </div>
    <b-modal id="new-event" 
             title="Add Event to Mission"
             size="lg"
             ok-only
             @show="onShow()">
      <b-card-group>
        <EventComponent v-for="event in unassignedEvents" 
                            :key="event.id" 
                            :event="event">
          <b-btn :id="'input-' + event.id"
                 variant="primary"
                 @click="onAddEvent(event)">
            Add
          </b-btn>
        </EventComponent>
      </b-card-group>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { Event } from '@/interfaces/Event';
  import EventComponent from './EventComponent.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      EventComponent
    }
  })
  export default class AddEventModal extends Vue {
    @Prop() private missionid!: number;
    private unassignedEvents: Event[] = [];
    private service: Service;

    constructor() {
      super();
      this.service = new Service();
    }

    private async onShow() {
      this.unassignedEvents = await this.service.getUnassignedEvents();
    }

    @Emit('requireUpdate')
    private async onAddEvent(event: Event) {
      await this.service.addEventToMission(event, this.missionid);
      this.unassignedEvents = await this.service.getUnassignedEvents();
    }
  }
</script>

<style scoped>
  div.interior-button {
    padding: 5px 30px;
  }
</style>