<template>
  <div>
    <AddApod @add-apod="addApod"/>
    <div class="row">
      <div class="col-6">
        <form method="post" class="input-group mb-3">
          <input
            type="text"
            name="search"
            id="search"
            class="form-control"
            autocomplete="off"
            placeholder="Search..."
          >
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </div>
        </form>
        <div class="card mt-2" v-for="(item, index) in allApods" :key="index">
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>

            <div>
              <!-- FOR VIDEO -->
              <iframe v-if="item.mediaType==='video'" width="498" height="332" :src="item.url"></iframe>

              <!-- FOR IMAGE -->
              <img
                v-if="item.mediaType==='image'"
                class="card-img-top"
                :src="item.url"
                alt="Card image cap"
              >
            </div>

            <div class="mt-3">
              <a
                href="#"
                class="btn btn-primary mr-2"
                @click.prevent="getOneApod(item._id)"
              >See detail</a>
              <a href="#" class="btn btn-danger" v-on:click.prevent="deleteApod(item._id)">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <router-view @update-apod="updateApod" :apod="apod"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios.js";
import Toast from "@/api/swal.js";
import AddApod from "@/components/AddApodForm.vue";
export default {
  props: ["allApods"],
  components: {
    AddApod
  },
  data() {
    return {
      allApods: [],
      apod: ""
    };
  },
  methods: {
    getOneApod(id) {
      axios
        .get(`/apods/${id}`, {
          headers: {
            "Access-Token": localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.apod = data;
          this.$router.push(`/list/${id}`);
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
          Toast.fire({
            type: "success",
            title: "Add success"
          });
          this.getAllApod();
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
          console.log(data);
          this.allApods = data;
          this.$emit("all-pods", this.allApods);
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    deleteApod(id) {
      axios
        .delete(`/apods/${id}`, {
          headers: {
            "Access-Token": localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "Delete success"
          });
          this.getAllApod();
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    updateApod(payload) {
      axios
        .put(
          `/apods/${payload.id}`,
          {
            date: payload.date
          },
          {
            headers: {
              "Access-Token": localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "Update success"
          });
          this.getAllApod();
          this.$router.push("/list");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  }
};
</script>

