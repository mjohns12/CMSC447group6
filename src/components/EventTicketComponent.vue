
<template>
  <b-card no-body :header="'<b>Ticket Type: </b>' + ticket.ticketType">
    <div>{{ ticket.ticketDescription }}</div>
    <div class="footer" slot="footer"><slot/></div>
  </b-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { EventTicket } from '@/interfaces/Event';

  @Component
  export default class EquipmentComponent extends Vue {
    @Prop() private ticket!: EventTicket;
  }

</script>