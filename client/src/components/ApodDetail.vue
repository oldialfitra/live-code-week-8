<template>
  <div class="card" id="detail">
    <div class="card-header">Detail</div>
    <div class="card-body">
      <h2 class="card-title">
        <u>{{apod.title}}</u>
      </h2>
      <div class="card-text">
        <h4>Description</h4>
        {{apod.desc}}
        <br>
        <br>
        <br>
        <h4>Date of picture</h4>
        {{new Date(apod.date).toISOString().slice(0, 10)}}
      </div>
    </div>
    <form v-on:submit.prevent="updateApod(apod._id)" class="input-group">
      <datepicker v-model="date"></datepicker>
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
export default {
  props: ["apod"],
  components: {
    Datepicker
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    updateApod(id) {
      this.$emit("update-apod", { id, date: this.date });
      this.date = ''
    }
  }
};
</script>

