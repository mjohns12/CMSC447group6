<template>
  <div>
    <b-btn v-b-modal="'event-detail-' + event.id">View</b-btn>
    <b-modal :id="'event-detail-' + event.id"
             :title="'Event #' + event.id + ' Details'">
      <b-tabs card>
        <b-tab title="View Event" no-body active>
          <EventComponent :event="event"/>
        </b-tab>
        <b-tab v-if="event.equipment.length" title="Issue Equipment">
          <b-card-group>
            <EquipmentComponent v-for="(equip, index) in event.equipment" 
                                :key="equip.id" 
                                :equipment="equip">
              <b-form-select :id="'input-' + equip.id"
                            v-model="selectedEquipment[index].quantity"
                            :options="range(1, equip.quantity)"
                            size="sm"
                            type="number"
                            placeholder="Number"/>
            </EquipmentComponent>
          </b-card-group>
          <b-btn @click="onEquipmentIssue">Issue</b-btn>
        </b-tab>
        <b-tab v-if="!admin" title="Create Ticket">
          <b-form-group label="Ticket Type:">
            <b-form-select v-model="ticketToSubmit.ticketType" 
                           :options="ticketTypes" 
                           class="mb-3"/>
          </b-form-group>
          <b-form-group label="Ticket Description:">
            <b-form-textarea v-model="ticketToSubmit.ticketDescription" 
                             class="mb-3"
                             :rows="3"/>
            <b-btn  variant="primary" 
                    @click="onAddTicket"
                    :disabled="!ticketToSubmit.ticketType || !ticketToSubmit.ticketDescription">
              Issue
            </b-btn>
          </b-form-group>
        </b-tab>
        <b-tab v-if="admin" title="View Tickets">
          <b-card-group>
            <EventTicketComponent v-for="ticket in event.tickets" 
                                :key="ticket.id" 
                                :ticket="ticket">
              <b-btn @click="resolveTicket(ticket)">Resolve</b-btn>
            </EventTicketComponent>
          </b-card-group>
        </b-tab>
        <b-tab v-if="admin" title="Require Equipment">
          <RequireEquipmentComponent :event="event" v-on:requireUpdate="$emit('requireUpdate')"/>
        </b-tab>
        <b-tab v-if="admin" title="Change Priority">
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
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { Event, EventTicket, EventTicketType, EventTicketStatus } from '@/interfaces/Event';
  import { Equipment } from '@/interfaces/Equipment';
  import EventComponent from './EventComponent.vue';
  import EquipmentComponent from './EquipmentComponent.vue';
  import RequireEquipmentComponent from './RequireEquipmentComponent.vue';
  import EventTicketComponent from './EventTicketComponent.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      EventComponent,
      EquipmentComponent,
      RequireEquipmentComponent,
      EventTicketComponent
    }
  })
  export default class EventDetailModel extends Vue {
    @Prop() private missionid!: number;
    @Prop() private event!: Event;
    @Prop({ default: false }) private admin!: boolean;
    private service: Service = new Service();
    private selectedPriority: number = this.event.priority;
    private selectedEquipment: Array<{ quantity: number | null, equipment: Equipment }>;
    private ticketToSubmit = {
      ticketStatus: EventTicketStatus.unresolved,
      ticketType: null,
      ticketDescription: null
    };
    private ticketTypes = {
      priority: 'Priority',
      responder: 'First Responder',
      equipment: 'Equipment'
    };

    constructor() {
      super();
      this.selectedEquipment = this.event.equipment
      .map((equip: Equipment) => {
        return {
          quantity: null,
          equipment: equip
        };
      });
    }

    private onShow() {
      this.selectedEquipment = this.event.equipment
      .map((equip: Equipment) => {
        return {
          quantity: null,
          equipment: equip
        };
      });
    }

    @Emit('requireUpdate')
    private onPriorityChange() {
      this.service.changePriority(this.event, this.selectedPriority);
    }

    @Emit('requireUpdate')
    private async onEquipmentIssue() {
      this.selectedEquipment.forEach((toAdd) => {
        if (toAdd.quantity) {
          this.service.issueEquipmentToEvent(this.event, toAdd.equipment, toAdd.quantity);
        }
      });
    }

    @Emit('requireUpdate')
    private async onAddTicket() {
      this.service.createEventTicket(this.ticketToSubmit, this.event);
    }

    @Emit('requireUpdate')
    private async resolveTicket(ticket: EventTicket) {
      this.service.resolveTicket(ticket);
    }

    private range(start: number, end: number): number[] {
      if (!start || !end || end < start) {
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