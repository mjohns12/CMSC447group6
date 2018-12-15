<template>
  <div>
    <b-card-group>
      <b-card header="Events" 
              class="mb-3"
              align="left"
              border-variant="primary"
              header-bg-variant="primary"
              header-text-variant="white"
              id='unassigned-events'>
        <EventComponent v-for="event in events"
                        :key="event.id" 
                        :event="event">
          <b-checkbox :id="'eventSelect' + event.id"
                          v-model="selectedEvents"
                          :value="event">
            Select Event
          </b-checkbox>
        </EventComponent>
      </b-card>
      <b-card header="First Responders"
              class="mb-3"
              align="left"
              border-variant="primary"
              header-bg-variant="primary"
              header-text-variant="white"
              id='unassigned-responders'>
        <ResponderComponent v-for="responder in responders" 
                            :key="responder.id" 
                            :firstResponder="responder">
          <b-checkbox :id="'responderSelect' + responder.id"
                          v-model="selectedResponders"
                          :value="responder">
            Select First Responder
          </b-checkbox>
        </ResponderComponent>
      </b-card>
    </b-card-group>
    <b-btn block @click="onSubmit">Create Mission</b-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EventComponent from '@/components/EventComponent.vue';
  import ResponderComponent from '@/components/ResponderComponent.vue';
  import { Mission } from '@/interfaces/Mission';
  import { Event } from '@/interfaces/Event';
  import { FirstResponder } from '@/interfaces/FirstResponder';
  import { Service } from '@/Services';

  @Component({
    name: 'newMission',
    components: {
      EventComponent,
      ResponderComponent
    },
  })
  export default class NewMission extends Vue {
    private service = new Service();
    private events: Event[] | null = null;
    private responders: FirstResponder[] | null = null;
    private selectedEvents: Event[] = [];
    private selectedResponders: FirstResponder[] = [];

    private async created(): Promise<void> {
      // This calls all of these asynchronous operations at once,
      // so you don't have to wait for one to finish before doing the next
      [this.events, this.responders] = await Promise.all([
        this.service.getUnassignedEvents(),
        this.service.getUnassignedResponders()
      ]);
    }

    private async onSubmit(): Promise<void> {

      if (this.selectedEvents.length === 0 || this.selectedResponders.length === 0) {
        alert('Please select at least one Event and one First Responder before attempting to create a Mission');
      } else {
        // Create the mission so you can add things to it
        const mission = await this.service.createMission();
        // Add all the selected first responders and events to the mission all at once,
        // so you don't have to do all the requests in serial
        await Promise.all(
          this.selectedEvents.map(
            (event) => this.service.addEventToMission(event, mission.id)
          ).concat(
            this.selectedResponders.map(
              (responder) => this.service.addResponderToMission(responder, mission.id)
            )
          )
        );
        // Reset the selected values, so weird things don't happen when things leave
        this.selectedEvents = [];
        this.selectedResponders = [];
        // Do the same thing we did in created() to get the new lists of things to display
        [this.events, this.responders] = await Promise.all([
          this.service.getUnassignedEvents(),
          this.service.getUnassignedResponders()
        ]);
      }
    }
  }

</script>

