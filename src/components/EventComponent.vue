
<template>
  <div class="row">
    <div>ID: {{ event.id }}</div>
    <div>Priority: {{ event.priority }}</div>
    <div>Location: {{ location }}</div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Event } from '@/interfaces/Event';

  @Component
  export default class EventComponent extends Vue {
    @Prop() private event!: Event;

    get location(): string {
        return this.event.streetNum + ' ' + this.event.street + ' ' + this.event.city + ' ' + this.event.state;
    }
  }

</script>

<style scoped>
  div.row {
    display: flex;
    margin: 4px 0;
    border: 2px solid #dfdfdf;
    padding: 4px;
  }
  .row > div {
    flex: 1 1 auto;
  }
</style>