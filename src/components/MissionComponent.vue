
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
          <EventDetailModal :event="event" :missionid="mission.id" admin="true"/>
          <b-btn variant="danger" @click="service.removeEventFromMission(event)">Remove</b-btn>
        </EventComponent>
      </b-card-group>
      <AddEventModal :missionid="mission.id"/>
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
          <b-btn variant="danger" @click="service.removeResponderFromMission(responder)">Remove</b-btn>
          <b-modal :id="'edit-responder-' + responder.id" 
                   title="Using Component Methods">
            <div class="d-block text-center">
              <h3>Hello From My Modal!</h3>
            </div>
          </b-modal>
        </ResponderComponent>
      </b-card-group>
      <AddResponderModal :missionid="mission.id"/>
    </b-collapse>

    <div class="button-container">
      <b-btn block v-b-toggle="'equipment' + mission.id" variant="primary">Equipment</b-btn>
    </div>
    <b-collapse :id="'equipment' + mission.id" class="mt-2">
      <b-card-group deck>
        <EquipmentComponent v-for="equipment in mission.equipment" 
                            :key="equipment.id"
                            :equipment="equipment">
          <b-btn v-b-modal="'edit-equipment-' + equipment.id">Edit</b-btn>
          <b-btn variant="danger" @click="service.removeEquipmentFromMission(equipment)">Remove</b-btn>
          <b-modal :id="'edit-equipment-' + equipment.id" 
                   title="Using Component Methods">
            <div class="d-block text-center">
              <h3>Hello From My Modal!</h3>
            </div>
          </b-modal>
        </EquipmentComponent>
      </b-card-group>
      <AddEquipmentModal :missionid="mission.id"/>
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
  import AddEquipmentModal from './AddEquipmentModal.vue';
  import AddResponderModal from './AddResponderModal.vue';
  import AddEventModal from './AddEventModal.vue';
  import EventDetailModal from './EventDetailModal.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      EventComponent,
      ResponderComponent,
      EquipmentComponent,
      AddEquipmentModal,
      AddResponderModal,
      AddEventModal,
      EventDetailModal
    }
  })
  export default class MissionComponent extends Vue {
    @Prop() private mission!: Mission;
    private service: Service;

    constructor() {
      super();
      this.service = new Service();
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