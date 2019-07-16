<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/animal">Animals</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <b-container class="bv-example-row mt-5">
      <b-row>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>    
  </div>
</template>

