<template>
  <div class="inProgress">
    <MissionComponent v-for="mission in testMissions"
      v-bind:key="mission.id"
      v-bind:mission="mission">
    </MissionComponent>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import MissionComponent from '@/components/MissionComponent.vue';
  import { Mission } from '@/interfaces/Mission';

  @Component({
    name: 'inProgress',
    components: {
      MissionComponent
    },
  })
  export default class MissionInProgress extends Vue {
    @Prop() private missions!: Mission[];

    get testMissions() {
      const json = require('../test_files/missions.json');
      return json;
    }
  }

</script>
