<template>
  <b-card-group>
    <b-card header="Events" 
            class="mb-3"
            align="left"
            border-variant="primary"
            header-bg-variant="primary"
            header-text-variant="white">
      <EventComponent v-for="event in events"
                      :key="event.id" 
                      :event="event">
      </EventComponent>
    </b-card>
    <b-card header="First Responders"
            class="mb-3"
            align="left"
            border-variant="primary"
            header-bg-variant="primary"
            header-text-variant="white">
      <ResponderComponent v-for="responder in responders" 
                          :key="responder.id" 
                          :firstResponder="responder">
      </ResponderComponent>
    </b-card>
    <b-card header="Equipment"
            class="mb-3"
            align="left"
            border-variant="primary"
            header-bg-variant="primary"
            header-text-variant="white">
      <EquipmentComponent v-for="equip in equipment" 
                          :key="equip.id" 
                          :equipment="equip">
      </EquipmentComponent>
    </b-card>
  </b-card-group>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import EventComponent from '@/components/EventComponent.vue';
  import ResponderComponent from '@/components/ResponderComponent.vue';
  import EquipmentComponent from '@/components/EquipmentComponent.vue';
  import { Mission } from '@/interfaces/Mission';
  import { Event } from '@/interfaces/Event';
  import { FirstResponder } from '@/interfaces/FirstResponder';
  import { Equipment } from '@/interfaces/Equipment';
  import { Service } from '@/Services';

  @Component({
    name: 'newMission',
    components: {
      EventComponent,
      ResponderComponent,
      EquipmentComponent
    },
  })
  export default class NewMission extends Vue {
    private service = new Service();
    private events: Event[] | null = null;
    private responders: FirstResponder[] | null = null;
    private equipment: Equipment[] | null = null;

    private async created(): Promise<void> {
      // This calls all three of these asynchronous operations at once,
      // so you don't have to wait for one to finish before doing the next
      [this.events, this.responders, this.equipment] = await Promise.all([
        this.service.getUnassignedEvents(),
        this.service.getUnassignedResponders(),
        this.service.getAllEquipment()
      ]);
    }
  }

</script>
