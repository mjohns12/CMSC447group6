<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="main_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Home</b-navbar-brand>
      <b-collapse is-nav id="main_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Operations Chief">
            <b-dropdown-item to="/op-chief/active-missions">View Active Missions</b-dropdown-item>
            <b-dropdown-item to="/op-chief/create-mission">Create Mission</b-dropdown-item>
            <b-dropdown-item to="/op-chief/create-responder">Create Responder</b-dropdown-item>
            <b-dropdown-item to="/op-chief/create-equipment">Create Equipment</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/first-responder/98765">First Responder</b-nav-item>
          <b-nav-item to="/call-center">Call Center</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view id="app-body"></router-view>
  </div>
</template>

<style>

  html, body {
    width: 100%;
    height:100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    max-width: 1080px;
    height: 100%;
    margin: auto;
  }

  #app-body {
    padding: 5px;
    margin: auto;
  }
</style>
