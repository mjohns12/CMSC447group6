<template>
  <div>
    <div class="interior-button">
      <b-btn block v-b-modal.new-responder>Add First Responder</b-btn>
    </div>
    <b-modal id="new-responder" 
             title="Add Responder to Mission"
             size="lg"
             ok-only
             @show="onShow()">
      <b-card-group columns>
        <ResponderComponent v-for="responder in unassignedResponders" 
                            :key="responder.id" 
                            :firstResponder="responder">
          <b-btn :id="'input-' + responder.id"
                 variant="primary"
                 @click="onAddResponder(responder)">
            Add
          </b-btn>
        </ResponderComponent>
      </b-card-group>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import { FirstResponder } from '@/interfaces/FirstResponder';
  import ResponderComponent from './ResponderComponent.vue';
  import { Service } from '@/Services';

  @Component({
    components: {
      ResponderComponent
    }
  })
  export default class AddResponderModal extends Vue {
    @Prop() private missionid!: number;
    private unassignedResponders: FirstResponder[] = [];
    private service: Service;

    constructor() {
      super();
      this.service = new Service();
    }

    private async onShow() {
      this.unassignedResponders = await this.service.getUnassignedResponders();
    }

    @Emit('requireUpdate')
    private async onAddResponder(responder: FirstResponder) {
      await this.service.addResponderToMission(responder, this.missionid);
      this.unassignedResponders = await this.service.getUnassignedResponders();
    }
  }
</script>

<style scoped>
  div.interior-button {
    padding: 5px 30px;
  }
</style>