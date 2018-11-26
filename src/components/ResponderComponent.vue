
<template>
  <div class="row">
    <div>ID: {{ firstResponder.id }}</div>
    <div>Name: {{ responderName }}</div>
    <div>Phone #: {{ firstResponder.phoneNumber }}</div>
    <div>Occupation: {{ firstResponder.occupation }}</div>
    <div>Location: TBD</div>
    <div>Most Recent Status: TBD</div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { FirstResponder } from '@/interfaces/FirstResponder';

  @Component
  export default class ResponderComponent extends Vue {
    @Prop() private firstResponder!: FirstResponder;

    get responderName() {
        return this.firstResponder.firstName + ' ' + this.firstResponder.lastName;
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