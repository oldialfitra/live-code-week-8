<template>
  <div class="jumbotron">
    <div class="row justify-content-center text-center">
      <div class="col-6">
        <div>
          <h2>Add Astronomy Picture</h2>
          <p>
            <em>Please input date</em>, etc.
          </p>
          <form v-on:submit.prevent="addApod" class="input-group">
            <datepicker v-model="date"></datepicker>
            <div class="input-group-append">
              <button class="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Datepicker from "vuejs-datepicker";
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    addApod() {
        console.log('tambah apod')
      this.$emit("add-apod", this.date);
      this.date = ''
    }
  }
};
</script>

