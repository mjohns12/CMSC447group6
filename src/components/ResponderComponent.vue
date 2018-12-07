
<template>
  <b-card no-body :header="'<b>Responder Name: </b>' + responderName">
    <b-container fluid>
      <b-row>
        <b-col class="no-padding">
          <div class="responder-titles">ID</div>
          <div>{{ firstResponder.id }}</div>
        </b-col>
        <b-col class="no-padding">
          <div class="responder-titles">Phone #</div>
          <div>{{ firstResponder.phoneNumber }}</div>
        </b-col>
        <b-col class="no-padding">
          <div class="responder-titles">Occupation</div>
          <div>{{ firstResponder.occupation }}</div>
        </b-col>
        <b-col class="no-padding">
          <div class="responder-titles">Status</div>
          <div>{{ mostRecentStatus.status }}</div>
        </b-col>
        <b-col v-if="mostRecentStatus.eventid"
               class="no-padding">
          <div class="responder-titles">Event ID</div>
          <div>{{ mostRecentStatus.eventid }}</div>
        </b-col>
      </b-row>
    </b-container>
    <div class="footer" slot="footer"><slot/></div>
  </b-card>
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
  .no-padding {
    padding: 0;
  }
  .no-padding > div {
    padding: 0 4px;
  }
  .responder-titles {
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