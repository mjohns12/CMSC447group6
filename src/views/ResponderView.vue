
<template>
  <div class="main">
    <div v-if="responder">{{ responder }}</div>
    <div v-if="mission">
      
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Equipment } from '@/interfaces/Equipment';
  import { FirstResponder } from '@/interfaces/FirstResponder';
  import { Service } from '@/Services';
  import { Mission } from '@/interfaces/Mission';
  import EventComponent from '@/components/EventComponent.vue';

  @Component({
    components: {
      EventComponent
    }
  })
  export default class EquipmentComponent extends Vue {
    @Prop() private id!: number;
    private service: Service = new Service();
    private responder: FirstResponder | null = null;
    private mission: Mission | null = null;

    private async created(): Promise<void> {
      this.responder = await this.service.getResponder(this.id);
      if (this.responder.assignedMissionID) {
        this.mission = await this.service.getMission(this.responder.assignedMissionID);
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