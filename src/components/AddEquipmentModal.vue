<template>
  <div>
    <div class="interior-button">
      <b-btn block v-b-modal.new-equipment>Add Equipment</b-btn>
    </div>
    <b-modal id="new-equipment" 
             title="Add Equipment to Mission"
             size="lg"
             @show="onShow()"
             @ok="onSubmit()">
      <b-card-group columns>
        <EquipmentComponent v-for="(equip, index) in unassignedEquipment" 
                            :key="equip.id" 
                            :equipment="equip">
          <b-form-select :id="'input-' + equip.id"
                         v-model="selected[index].quantity"
                         :options="range(1, equip.quantity)"
                         size="sm"
                         type="number"
                         placeholder="Number"/>
        </EquipmentComponent>
      </b-card-group>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Equipment } from '@/interfaces/Equipment';
  import EquipmentComponent from './EquipmentComponent.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      EquipmentComponent
    }
  })
  export default class AddEquipmentModal extends Vue {
    @Prop() private missionid!: number;
    private unassignedEquipment: Equipment[] = [];
    private service: Service;
    private selected: Array<{
      quantity: number | null
      equipment: Equipment
    }> = [];

    constructor() {
      super();
      this.service = new Service();
    }

    private async onShow() {
      this.unassignedEquipment = await this.service.getUnassignedEquipment();
      this.selected = this.unassignedEquipment
      .map((equip: Equipment) => {
        return {
          quantity: null,
          equipment: equip
        };
      });
    }

    private async onSubmit() {
      this.selected.forEach((toAdd) => {
        if (toAdd.quantity) {
          this.service.addEquipmentToMission(toAdd.equipment, toAdd.quantity, this.missionid);
        }
      });
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