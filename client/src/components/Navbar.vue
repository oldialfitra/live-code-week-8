<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">From NASA with love</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
        </ul>
      </div>

      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <!--<li class="nav-item">-->
          <!--<a class="nav-link" href="/login">Login</a>-->
          <!--</li>-->
          <!--<li class="nav-item">-->
          <!--<a class="nav-link" href="/register">Register</a>-->
          <!--</li>-->
          <li class="nav-item" v-if="user.isLoggedIn===true">
            <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    logout() {
      this.$router.push("/login");
      localStorage.clear();
      this.$store.dispatch("logInOut", false);
    }
  },
  computed: mapState(["user"])
};
</script>

