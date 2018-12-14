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
                    placeholder="First Name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="lname-group"
                  label="Last Name:"
                  label-for="last-name"
                  horizontal>
      <b-form-input id="last-name"
                    type="text"
                    v-model="form.lName"
                    required
                    placeholder="Last Name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="email-group"
                  label="Email address:"
                  label-for="email-input"
                  horizontal>
      <b-form-input id="email-input"
                    type="email"
                    v-model="form.email"
                    required
                    placeholder="Email">
      </b-form-input>
    </b-form-group>
    <b-form-group id="phone-group"
                  label="Phone Number:"
                  label-for="phone-input"
                  horizontal>
      <b-form-input id="phone-input"
                    type="tel"
                    v-model="form.phone"
                    required
                    placeholder="Phone #">
      </b-form-input>
    </b-form-group>
    <b-form-group id="occupation-group"
                  label="Occupation:"
                  label-for="occupation-input"
                  horizontal>
      <b-form-select id="occupation-input" 
                      v-model="form.occupation"
                      :options="occupations"
                      placeholder="Occupation"
                      required>
        <template slot="first">
          <option :value="null" disabled>-- Please select an option --</option>
        </template>
      </b-form-select>
    </b-form-group>
    <b-form-group id="branch-group"
                  label="Branch Name:"
                  label-for="branch-input"
                  horizontal>
      <b-form-input id="branch-input"
                    type="text"
                    v-model="form.branch"
                    required
                    placeholder="Branch Name">
      </b-form-input>
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
  
    private service = new Service();
    private form = {
      email: '',
      fName: '',
      lName: '',
      phone: '',
      occupation: null,
      branch: ''
    };
    private show = true;

    get occupations(): Occupation[] {
      return Object.values(Occupation);
    }

    private onSubmit(evt: Event) {
      evt.preventDefault();
      this.service.createResponder(this.form);
    }

    private onReset(evt: Event) {
      evt.preventDefault();
      /* Reset our form values */
      this.form = {
        email: '',
        fName: '',
        lName: '',
        phone: '',
        occupation: null,
        branch: ''
      };
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }

</script>