<template>
  <div id="app">
    <Navbar/>
    <div class="container my-4">
      <router-view :allApods="apods" @login="login"/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import AddApod from "@/components/AddApodForm.vue";
import ApodList from "@/views/ApodList.vue";
import axios from "@/api/axios.js";
import Toast from "@/api/swal.js";
import { mapState } from "vuex";
export default {
  components: {
    Navbar,
    AddApod,
    ApodList
  },
  data() {
    return {
      apods: [],
      date: ""
    };
  },
  methods: {
    login(payload) {
      axios
        .post("/users/login", {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.accessToken);
          Toast.fire({
            type: "success",
            title: "Logged in"
          });
          this.$router.push("/list");
          this.getAllApod();
          this.$store.dispatch("logInOut", true);
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    addApod(payload) {
      axios
        .post(
          "/apods",
          {
            date: payload
          },
          {
            headers: {
              "Access-Token": localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.apods.push(data);
          Toast.fire({
            type: "success",
            title: "Add success"
          });
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    getAllApod() {
      axios
        .get("/apods", {
          headers: {
            "Access-Token": localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data)
          this.apods = data;
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/list");
      this.$store.dispatch("logInOut", true);
      this.getAllApod();
    } else {
      this.$router.push("/login");
      this.apods = [];
      this.$store.dispatch("logInOut", false);
    }
  }
};
</script>

