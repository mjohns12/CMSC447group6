
<template>
  <div class="main" v-if="mission">
    <div class="event-map">
      <div class="event-sidebar">
        Events:
        <EventComponent v-for="event in mission.events"
                        :key="event.id" 
                        :event="event"/>
      </div>
      <LMap ref="responderMap" id="responder-map" :zoom="zoom" :center="center">
        <LTileLayer :url="mapURL" attribution="OpenStreetMaps"></LTileLayer>
        <LMarker :lat-lng="marker" :icon="icon"></LMarker>
      </LMap>
    </div>
    <div class="responder-footer">
      First Responders:
      <ResponderComponent v-for="responder in mission.firstResponders"
                          :key="responder.id" 
                          :firstResponder="responder"/>
        
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { Equipment } from '@/interfaces/Equipment';
  import { FirstResponder } from '@/interfaces/FirstResponder';
  import { Service } from '@/Services';
  import { Mission } from '@/interfaces/Mission';
  import EventComponent from '@/components/EventComponent.vue';
  import ResponderComponent from '@/components/ResponderComponent.vue';
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
  import L from 'leaflet';

  @Component({
    components: {
      EventComponent,
      ResponderComponent,
      LMap,
      LTileLayer,
      LMarker
    }
  })
  export default class EquipmentComponent extends Vue {
    @Prop() private id!: number;
    private mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    private zoom = 13;
    private center = [47.413220, -1.219482];
    private marker = [47.413220, -1.219482];
    private icon = L.icon({
      iconUrl: require('../assets/marker-icon.png'),
      shadowUrl: require('../assets/marker-shadow.png'),
      iconRetinaUrl: require('../assets/marker-icon-2x.png')
    });
    private service: Service = new Service();
    private responder: FirstResponder | null = null;
    private mission: Mission | null = null;
 
    private async created(): Promise<void> {
      this.responder = await this.service.getResponder(this.id);
      if (this.responder && this.responder.assignedMissionID) {
        this.mission = await this.service.getMission(this.responder.assignedMissionID);
      }
    }

    @Watch('id')
    private async onIdChanged(): Promise<void> {
      this.responder = await this.service.getResponder(this.id);
      if (this.responder && this.responder.assignedMissionID) {
        this.mission = await this.service.getMission(this.responder.assignedMissionID);
      } else {
        this.mission = null;
      }
    }
  }

</script>

<style scoped>
  div.main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 72px);
    overflow: auto;
  }

  div.event-map {
    display: flex;
    height: 60%
  }

  div.event-sidebar, div.responder-footer {
    overflow: auto;
  }

  div.event-sidebar {
    min-width: 35%;
  }

  div.event-map > element {
    flex: 1 1 auto;
  }

  #responder-map {
    min-height: 30%;
    max-height: 100%;
    min-width: 250px;
  }

  @media only screen and (max-width: 600px) {
    div.event-map {
      flex-direction: column-reverse;
    }
  }
</style>