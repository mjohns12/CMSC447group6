
<template>
  <div class="row">
    <div>ID: {{ firstResponder.id }}</div>
    <div>Name: {{ responderName }}</div>
    <div>Phone #: {{ firstResponder.phoneNumber }}</div>
    <div>Occupation: {{ firstResponder.occupation }}</div>
    <div>Most Recent Status: {{ mostRecentStatus.status }}</div>
    <div v-if="mostRecentStatus.event">Event ID: {{ mostRecentStatus.event.id }}</div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { FirstResponder, ResponderStatus, ResponderStatusType } from '@/interfaces/FirstResponder';

  @Component
  export default class ResponderComponent extends Vue {
    @Prop() private firstResponder!: FirstResponder;

    get responderName() {
        return this.firstResponder.firstName + ' ' + this.firstResponder.lastName;
    }

    get mostRecentStatus(): ResponderStatus {
      if (this.firstResponder.statuses.length) {
        return this.firstResponder.statuses.reduce((newestStatus, status): ResponderStatus => {
          return status.time > newestStatus.time ? status : newestStatus;
        });
      } else {
        return {
          time: new Date(),
          status: ResponderStatusType.unassigned
        };
      }
    }
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