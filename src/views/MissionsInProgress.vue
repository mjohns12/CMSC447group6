<template>
  <div class="inProgress">
    <MissionComponent v-for="mission in missions"
      v-bind:key="mission.id"
      v-bind:initialMission="mission">
    </MissionComponent>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import MissionComponent from '@/components/MissionComponent.vue';
  import { Mission } from '@/interfaces/Mission';
  import { Service } from '@/Services';

  @Component({
    name: 'inProgress',
    components: {
      MissionComponent
    },
  })
  export default class MissionInProgress extends Vue {
    private missions: Mission[] | null = null;
    private service = new Service();

    private async created(): Promise<void> {
      this.missions = await this.service.getMissions();
    }
  }

</script>
