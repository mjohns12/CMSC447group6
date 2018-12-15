
<template>
  <b-card class="mb-3"
          align="left"
          border-variant="primary"
          :header="'Mission ID: ' + mission.id"
          header-bg-variant="primary"
          header-text-variant="white">
    <div class="button-container">
      <b-btn block v-b-toggle="'events' + mission.id" variant="primary">Events</b-btn>
    </div>
    <b-collapse :id="'events' + mission.id" class="mt-2">
      <b-card-group deck>
        <EventComponent :event="event"
                        v-for="event in mission.events"
                        :key="event.id">
          <EventDetailModal :event="event" :missionid="mission.id" admin="true" v-on:requireUpdate="onUpdate"/>
          <b-btn variant="danger" @click="removeEvent(event)">Remove</b-btn>
        </EventComponent>
      </b-card-group>
      <AddEventModal :missionid="mission.id" v-on:requireUpdate="onUpdate"/>
    </b-collapse>
    
    <div class="button-container">
      <b-btn block v-b-toggle="'first-responders' + mission.id" variant="primary">First Responders</b-btn>
    </div>
    <b-collapse :id="'first-responders' + mission.id" class="mt-2">
      <b-card-group deck>
        <ResponderComponent :firstResponder="responder" 
                            v-for="responder in mission.firstResponders" 
                            :key="responder.id">
          <b-btn v-b-modal="'edit-responder-' + responder.id">Edit</b-btn>
          <b-btn variant="danger" @click="removeResponder(responder)">Remove</b-btn>
          <b-modal :id="'edit-responder-' + responder.id" 
                   title="Using Component Methods">
            <div class="d-block text-center">
              <h3>Hello From My Modal!</h3>
            </div>
          </b-modal>
        </ResponderComponent>
      </b-card-group>
      <AddResponderModal :missionid="mission.id" v-on:requireUpdate="onUpdate"/>
    </b-collapse>
    <div class="button-container" v-if="mission.equipment.length">
      <b-btn block v-b-toggle="'equipment' + mission.id" variant="primary">Equipment Required</b-btn>
    </div>
    <b-collapse v-if="mission.equipment.length" :id="'equipment' + mission.id" class="mt-2">
      <b-card-group deck>
        <EquipmentComponent v-for="equipment in mission.equipment" 
                            :key="equipment.id"
                            :equipment="equipment"/>
      </b-card-group>
    </b-collapse>
  </b-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Mission } from '@/interfaces/Mission';
  import { Event } from '@/interfaces/Event';
  import EventComponent from './EventComponent.vue';
  import ResponderComponent from './ResponderComponent.vue';
  import EquipmentComponent from './EquipmentComponent.vue';
  import AddResponderModal from './AddResponderModal.vue';
  import AddEventModal from './AddEventModal.vue';
  import EventDetailModal from './EventDetailModal.vue';
  import { Service } from '@/Services';
  import { FirstResponder } from '@/interfaces/FirstResponder';

  @Component({
    components: {
      EventComponent,
      ResponderComponent,
      EquipmentComponent,
      AddResponderModal,
      AddEventModal,
      EventDetailModal
    }
  })
  export default class MissionComponent extends Vue {
    @Prop() private initialMission!: Mission;
    private service: Service;
    private mission: Mission = this.initialMission;

    constructor() {
      super();
      this.service = new Service();
    }

    private async removeEvent(event: Event) {
      this.service.removeEventFromMission(event);
      this.onUpdate();
    }

    private async removeResponder(responder: FirstResponder) {
      await this.service.removeResponderFromMission(responder);
      this.onUpdate();
    }

    private async onUpdate(): Promise<void> {
      this.mission = await this.service.getMission(this.mission.id);
    }
  }

</script>

<style scoped>
  div.button-container {
    padding: 5px 0;
  }
  div.interior-button {
    padding: 5px 30px;
  }
</style>