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
            <EquipmentComponent v-for="(equip, index) in event.equipmentNeeded" 
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
        <b-tab v-if="admin" title="Require Equipment">
          <b-form-group label="Equipment Type:">
            <b-form-select v-model="toRequire.id" 
                           :options="equipmentList" 
                           class="mb-3" 
                           :select-size="4"/>
          </b-form-group>
          <b-form-group label="Equipment Amount:">
            <b-form-input v-model="toRequire.quantity"
                          type="number" 
                          :formatter="numFormat"
                          class="mb-3"/>
            <b-btn  variant="primary" 
                    @click="onAddRequiredEquipment"
                    :disabled="!toRequire.quantity || !toRequire.id">
              Issue
            </b-btn>
          </b-form-group>
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
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Event } from '@/interfaces/Event';
  import { Equipment } from '@/interfaces/Equipment';
  import EventComponent from './EventComponent.vue';
  import EquipmentComponent from './EquipmentComponent.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      EventComponent,
      EquipmentComponent
    }
  })
  export default class EventDetailModel extends Vue {
    @Prop() private missionid!: number;
    @Prop() private event!: Event;
    @Prop({ default: false }) private admin!: boolean;
    private service: Service;
    private selectedPriority: number = this.event.priority;
    private selectedEquipment: Array<{
      quantity: number | null,
      equipment: Equipment
    }>;
    private toRequire: {
      id: number | null,
      quantity: number | null
    } = {
      id: null,
      quantity: 0
    };
    private equipmentList: Array<{
      value: number,
      text: string
    }> | null = [];

    constructor() {
      super();
      this.service = new Service();
      this.selectedEquipment = this.event.equipment
      .map((equip: Equipment) => {
        return {
          quantity: null,
          equipment: equip
        };
      });
    }

    private async created(): Promise<void> {
      const list = await this.service.getAllEquipment();
      this.equipmentList = list.map((equip) => {
        return {
          value: equip.id,
          text: equip.equipmentType
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

    private onPriorityChange() {
      this.service.changePriority(this.event, this.selectedPriority);
    }

    private async onEquipmentIssue() {
      this.selectedEquipment.forEach((toAdd) => {
        if (toAdd.quantity) {
          this.service.issueEquipmentToEvent(this.event, toAdd.equipment, toAdd.quantity);
        }
      });
    }

    private onAddRequiredEquipment() {
      if (this.toRequire.quantity && this.toRequire.id) {
        this.service.requireEquipmentForEvent(this.event, this.toRequire.id, this.toRequire.quantity);
      }
    }

    private numFormat(value: string): string {
      if (Number(value) < 0) {
        return '0';
      }
      return value;
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