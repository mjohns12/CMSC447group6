
<template>
  <b-card class="mb-3"
          align="left"
          border-variant="primary"
          :header="'Mission ID: ' + mission.id"
          header-bg-variant="primary"
          header-text-variant="white">
    <div class="button-container">
      <b-btn block v-b-toggle.events variant="primary">Events</b-btn>
    </div>
    <b-collapse id="events" class="mt-2">
      <EventComponent 
        v-for="event in mission.events" 
        v-bind:key="event.id" 
        v-bind:event="event">
      </EventComponent>
    </b-collapse>
    
    <div class="button-container">
      <b-btn block v-b-toggle.first-responders variant="primary">First Responders</b-btn>
    </div>
    <b-collapse id="first-responders" class="mt-2">
      <ResponderComponent 
        v-for="responder in mission.firstResponders"
        v-bind:key="responder.id" 
        v-bind:firstResponder="responder">
      </ResponderComponent>
    </b-collapse>
    
    <div class="button-container">
      <b-btn block v-b-toggle.equipment variant="primary">Equipment</b-btn>
    </div>
    <b-collapse id="equipment" class="mt-2">
      <EquipmentComponent 
        v-for="equipment in mission.equipment" 
        v-bind:key="equipment.id" 
        v-bind:equipment="equipment">
      </EquipmentComponent>
    </b-collapse>
  </b-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Mission } from '@/interfaces/Mission';
  import EventComponent from './EventComponent.vue';
  import ResponderComponent from './ResponderComponent.vue';
  import EquipmentComponent from './EquipmentComponent.vue';

  @Component({
    components: {
      EventComponent,
      ResponderComponent,
      EquipmentComponent
    }
  })
  export default class MissionComponent extends Vue {
    @Prop() private mission!: Mission;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.button-container {
    padding: 5px 0;
  }
</style>