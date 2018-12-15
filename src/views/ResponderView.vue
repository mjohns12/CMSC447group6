
<template>
  <div class="main" v-if="mission">
    <b-alert variant="success"
             dismissible
             :show="showBanner"
             @dismissed="showBanner=false">
      {{ this.bannerText }}
    </b-alert>
    <div class="event-map" v-if="mission.events.length">
      <div class="event-sidebar">
        Events:
        <EventComponent v-for="event in mission.events"
                        :key="event.id" 
                        :event="event"
                        v-on:click="selectedEvent = event">
          <EventDetailModal :event="event"/>
          <b-btn @click="onSelect(event)">Focus</b-btn>
          <b-btn @click="onChoose(event)" variant="primary">Choose</b-btn>
        </EventComponent>
      </div>
      <LMap ref="responderMap" 
            id="responder-map" 
            :zoom="zoom" 
            :center="center">
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="OpenStreetMaps" />
        <LMarker v-for="event in mission.events" 
                 v-if="event.lat && event.lon"
                 :key="event.id" 
                 :lat-lng="[event.lat, event.lon]" 
                 :icon="icon" />
      </LMap>
    </div>
    <div class="responder-footer">
      First Responders<span v-if="this.selectedEvent"> at Event #{{ this.selectedEvent.id }}</span>:
      <ResponderComponent v-for="responder in responderList"
                          :key="responder.id" 
                          :firstResponder="responder"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { Equipment } from '@/interfaces/Equipment';
  import { FirstResponder, ResponderStatus, ResponderStatusType } from '@/interfaces/FirstResponder';
  import { Event } from '@/interfaces/Event';
  import { Service } from '@/Services';
  import { Mission } from '@/interfaces/Mission';
  import EventComponent from '@/components/EventComponent.vue';
  import EventDetailModal from '@/components/EventDetailModal.vue';
  import ResponderComponent from '@/components/ResponderComponent.vue';
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
  import L from 'leaflet';

  @Component({
    components: {
      EventComponent,
      ResponderComponent,
      LMap,
      LTileLayer,
      LMarker,
      EventDetailModal
    }
  })
  export default class ResponderView extends Vue {
    @Prop() private id!: number;
    private zoom = 10;
    private center = [0, 0];
    private icon = L.icon({
      iconUrl: require('../assets/marker-icon.png'),
      shadowUrl: require('../assets/marker-shadow.png'),
      iconRetinaUrl: require('../assets/marker-icon-2x.png')
    });
    private service: Service = new Service();
    private responder: FirstResponder | null = null;
    private mission: Mission | null = null;
    private responderList: FirstResponder[] = [];
    private selectedEvent: Event | null = null;
    private chosenEvent: Event | null | undefined = null;
    private showBanner: boolean = false;
    private bannerText = '';
 
    private created(): void {
      this.loadFromServer();
    }

    private async loadFromServer(): Promise<void> {
      // Get the responder's data and most recent status
      this.responder = await this.service.getResponder(this.id);
      const status = this.mostRecentStatus(this.responder);
      // If the responder exists and has a most recent status associated to a mission, get the mission they're on
      if (this.responder && status.mission_id) {
        this.mission = await this.service.getMission(status.mission_id);
      }
      // If the responder has a chosen event, focus that one
      if (status.event_id && this.mission) {
        this.chosenEvent = this.mission.events.find((event) => {
          return status.event_id === event.id;
        });
        this.selectedEvent = null;
        this.responderList = this.mission.firstResponders;
      }
    }

    // Function to return the most recent status associated to the given First Responder
    // That status has the current mission/event the responder is going to
    private mostRecentStatus(responder: FirstResponder): ResponderStatus {
      if (responder && responder.statuses && responder.statuses.length) {
        return responder.statuses.reduce((newestStatus, status): ResponderStatus => {
          return status.time > newestStatus.time ? status : newestStatus;
        });
      } else {
        return {
          time: new Date(),
          status: ResponderStatusType.unassigned
        };
      }
    }

    // Function that runs every time the responder ID is changed
    // This should only really happen when the URL is changed
    @Watch('id')
    private async onIdChanged(): Promise<void> {
      // Get the new responder and their current status
      this.responder = await this.service.getResponder(this.id);
      const status = this.mostRecentStatus(this.responder);
      // Get the mission the responder is on
      if (this.responder && status.mission_id) {
        this.mission = await this.service.getMission(status.mission_id);
      }
      // If the responder is already going to an event, focus it
      if (status.event_id && this.mission) {
        this.chosenEvent = this.mission.events.find((event) => {
          return status.event_id === event.id;
        });
      }
    }

    // Function that's called when the mission is changed
    @Watch('mission')
    private onMissionChanged(): void {
      // If the mission isn't null, find the new map center, then reload the responderlist
      // If you don't reload that, it'll still have the responders in the old mission in it
      if (this.mission) {
        const firstEvent = this.mission.events[0];
        if (firstEvent && firstEvent.lat && firstEvent.lon) {
          this.center = [firstEvent.lat, firstEvent.lon];
        }
        this.responderList = this.mission.firstResponders;
      }
    }

    // Function called when a 'choose' button is clicked, changes the event the first responder goes to,
    // then runs everything done on create, so everything stays consistent
    private async onChoose(event: Event) {
      this.chosenEvent = this.chosenEvent !== event ? event : null;
      if (this.responder) {
        const eventId = this.chosenEvent ? this.chosenEvent.id : null;
        const missionId = this.mission ? this.mission.id : null;

        this.bannerText = await this.service.assignResponder(eventId, this.responder, missionId);
        this.showBanner = true;

        this.loadFromServer();
      }
    }

    // Function called whenever a 'Focus' button is clicked, recalculates the map center,
    // and filters the list of responders to match with the selected event
    private onSelect(event: Event): void {
      if (!this.mission) {
        return;
      }
      this.selectedEvent = this.selectedEvent !== event ? event : null;
      if (this.selectedEvent) {
        this.center = [this.selectedEvent.lat, this.selectedEvent.lon];
        this.responderList = this.mission.firstResponders
          .filter((responder) => {
            if (this.selectedEvent) {
              return this.mostRecentStatus(responder).event_id === this.selectedEvent.id;
            }
        });
      } else {
        this.responderList = this.mission.firstResponders;
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