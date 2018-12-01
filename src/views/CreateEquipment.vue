<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="name-group"
                  label="Name:"
                  label-for="name"
                  horizontal>
      <b-form-input id="name"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Name of Equipment">
      </b-form-input>
    </b-form-group>
    <b-form-group id="quantity-group"
                  label="Quantity:"
                  label-for="quantity"
                  horizontal>
      <b-form-input id="quantity"
                    type="number"
                    v-model="form.quantity"
                    required
                    placeholder="Equipment Number">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class CreateEquipment extends Vue {
  
    private form = {
      name: '',
      quantity: null
    };
    private show = true;

    private onSubmit(evt: Event) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    }

    private onReset(evt: Event) {
      evt.preventDefault();
      /* Reset our form values */
      this.form = {
        name: '',
        quantity: null
        };
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }

</script>