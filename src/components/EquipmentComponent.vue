
<template>
  <div class="row">
    <div>ID: {{ equipment.id }}</div>
    <div>Name: {{ equipment.equipmentType }}</div>
    <div>Quantity: {{ equipment.quantity }}</div>
  </div>
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
  div.row {
    display: flex;
    margin: 10px 0;
    border: 2px solid #dfdfdf;
    border-radius: 10px;
    padding: 10px;
  }
  .row > div {
    flex: 1 1 auto;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    margin: 2px;
  }
</style>