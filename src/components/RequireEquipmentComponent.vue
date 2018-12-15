<template>
  <div>
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
              @click="onSubmit"
              :disabled="!toRequire.quantity || !toRequire.id">
        Issue
      </b-btn>
    </b-form-group>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { Equipment } from '@/interfaces/Equipment';
  import { Event } from '@/interfaces/Event';
  import EquipmentComponent from './EquipmentComponent.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      EquipmentComponent
    }
  })
  export default class RequireEquipmentComponent extends Vue {
    @Prop() private event!: Event;
    private service: Service = new Service();
    private toRequire: { id: number | null, quantity: number | null } = {
      id: null,
      quantity: 0
    };
    private equipmentList: Array<{ value: number, text: string }> = [];


    private async created(): Promise<void> {
      const list = await this.service.getAllEquipment();
      this.equipmentList = list.map((equip) => {
        return {
          value: equip.id,
          text: equip.equipmentType
        };
      });
    }

    @Emit('requireUpdate')
    private async onSubmit() {
      if (this.toRequire.quantity && this.toRequire.id) {
        this.service.requireEquipmentForEvent(this.event, this.toRequire.id, this.toRequire.quantity);
      }
    }

    // Function to make sure the equipment amount can't go below zero
    private numFormat(value: string): string {
      return Number(value) > 0 ? value : '0';
    }
  }
</script>

<style scoped>
  div.interior-button {
    padding: 5px 30px;
  }
</style>