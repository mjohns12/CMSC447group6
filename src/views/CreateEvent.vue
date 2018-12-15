<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="fname-group"
                  label="First Name:"
                  label-for="first-name"
                  horizontal>
      <b-form-input id="first-name"
                    type="text"
                    v-model="form.fName"
                    required
                    placeholder="Caller First Name"/>
    </b-form-group>
    <b-form-group id="lname-group"
                  label="Last Name:"
                  label-for="last-name"
                  horizontal>
      <b-form-input id="last-name"
                    type="text"
                    v-model="form.lName"
                    required
                    placeholder="Caller Last Name"/>
    </b-form-group>
    <b-form-group id="phone-group"
                  label="Phone Number:"
                  label-for="phone-input"
                  horizontal>
      <b-form-input id="phone-input"
                    v-model="form.phoneNum"
                    type="text"
                    placeholder="Phone #"
                    required/>
    </b-form-group>
    <b-form-group id="street-num-group"
                  label="Street Number:"
                  label-for="street-num-input"
                  horizontal>
      <b-form-input id="street-num-input"
                    type="number"
                    v-model="form.streetNum"
                    required
                    placeholder="Street Number"/>
    </b-form-group>
    <b-form-group id="street-name-group"
                  label="Street Name:"
                  label-for="street-name-input"
                  horizontal>
      <b-form-input id="street-name-input"
                    type="text"
                    v-model="form.streetName"
                    required
                    placeholder="Street Name"/>
    </b-form-group>
    <b-form-group id="city-group"
                  label="City:"
                  label-for="city-input"
                  horizontal>
      <b-form-input id="city-input"
                    v-model="form.city"
                    type="text"
                    placeholder="City"
                    required/>
    </b-form-group>
    <b-form-group id="state-group"
                  label="State:"
                  label-for="state-input"
                  horizontal>
      <b-form-input id="state-input"
                    v-model="form.state"
                    type="text"
                    placeholder="State"
                    required/>
    </b-form-group>
    <b-form-group id="zip-group"
                  label="Zip Code:"
                  label-for="zip-input"
                  horizontal>
      <b-form-input id="zip-input"
                    type="number"
                    v-model="form.zipCode"
                    required
                    placeholder="Zip Code"/>
    </b-form-group>
    <b-form-group id="priority-group"
                  label="Priority Code (1-10):"
                  label-for="priority-input"
                  horizontal>
      <b-form-input id="priority-input"
                    type="number"
                    v-model="form.priority"
                    required
                    placeholder="Priority Code"/>
    </b-form-group>
    <b-form-group id="description-group"
                  label="Description:"
                  label-for="description-input"
                  horizontal>
      <b-form-textarea id="description-input"
                     v-model="form.description"
                     placeholder="Description"
                     :rows="3"
                     :max-rows="6"/>
    </b-form-group>
    <b-form-group id="equipment-group"
                  label="Equipment:"
                  label-for="equipment-input"
                  horizontal>
      <b-form-textarea id="equipment-input"
                     v-model="form.equipment"
                     placeholder="Equipment (This is a placeholder until I can find a good way to do it)"
                     :rows="3"
                     :max-rows="6"/>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script lang="ts">

  import { Component, Vue } from 'vue-property-decorator';
  import { Occupation } from '@/interfaces/FirstResponder';
  import { Service } from '@/Services';

  @Component
  export default class CreateResponder extends Vue {

    private form = {
      fName: '',
      lName: '',
      phoneNum: '',
      streetNum: null,
      streetName: '',
      city: '',
      state: '',
      zipCode: null,
      priority: null,
      description: '',
      equipment: ''
    };
    private show = true;
    private service = new Service();

    get occupations(): Occupation[] {
      return Object.values(Occupation);
    }

    private onSubmit(evt: Event) {
      evt.preventDefault();
      this.service.createEvent(this.form);
    }

    private onReset(evt: Event) {
      evt.preventDefault();
      /* Reset our form values */
      this.form = {
      fName: '',
      lName: '',
      phoneNum: '',
      streetNum: null,
      streetName: '',
      city: '',
      state: '',
      zipCode: null,
      priority: null,
      description: '',
      equipment: ''
    };
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }

</script>