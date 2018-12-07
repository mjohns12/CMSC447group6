<template>
  <div>
    <div class="interior-button">
      <b-btn block v-b-modal.new-equipment>Add Equipment</b-btn>
    </div>
    <b-modal id="new-equipment" 
             title="Add Equipment to Mission"
             size="lg"
             @show="onShow()"
             centered
             no-fade
             lazy>
      <div>
        <EquipmentComponent v-for="equip in unassignedEquipment" 
                            :key="equip.id" 
                            :equipment="equip"/>
      </div>
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
    private selected: Equipment[] = [];

    constructor() {
      super();
      this.service = new Service();
    }

    private async onShow() {
      this.unassignedEquipment = await this.service.getUnassignedEquipment();
    }
  }
</script>

<style scoped>
  div.interior-button {
    padding: 5px 30px;
  }
</style>