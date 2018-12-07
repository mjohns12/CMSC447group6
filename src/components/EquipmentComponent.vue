
<template>
  <b-card no-body :header="'<b>Equipment Name: </b>' + equipment.equipmentType">
    <b-container fluid>
      <b-row>
        <b-col class="no-padding">
          <div class="equip-titles">ID:</div>
          <div>{{ equipment.id }}</div>
        </b-col>
        <b-col class="no-padding">
          <div class="equip-titles">Quantity:</div>
          <div>{{ equipment.quantity }}</div>
        </b-col>
      </b-row>
    </b-container>
    <div class="footer" slot="footer"><slot/></div>
  </b-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Equipment } from '@/interfaces/Equipment';

  @Component
  export default class EquipmentComponent extends Vue {
    @Prop() private equipment!: Equipment;
  }

</script>

<style scoped>
  .no-padding {
    padding: 0;
  }
  .no-padding > div {
    padding: 0 4px;
  }
  .equip-titles {
    background: #f7f7f7;
    font-weight: bolder;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin: 0 3px;
  }
</style>