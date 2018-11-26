<template>
  <div class="about">
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/op-chief/active-missions">View Active Missions</b-nav-item>
          <b-nav-item to="/op-chief/create-mission">Create Mission</b-nav-item>
          <b-nav-item to="/op-chief/create-responder">Create Responder</b-nav-item>
          <b-nav-item to="/op-chief/create-equipment">Create Equipment</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class OpChiefView extends Vue { }

</script>


<style scoped>
  .about {
    padding: 5px;
    margin: auto;
  }

</style>