<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="name-group"
                  label="Equipment Name:"
                  label-for="name"
                  horizontal>
      <b-form-input id="equipmentType"
                    type="text"
                    v-model="form.equipmentType"
                    required
                    placeholder="Name of Equipment">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';
  import { Service } from '@/Services';

  @Component
  export default class CreateEquipment extends Vue {
  
    private form = {
      equipmentType: ''
    };
    private show = true;
    private service = new Service();

    private onSubmit(evt: Event) {
      evt.preventDefault();
      this.service.createEquipment(this.form);
    }

    private onReset(evt: Event) {
      evt.preventDefault();
      /* Reset our form values */
      this.form = {
        equipmentType: ''
      };
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }

</script>