<template>
  <div class="row">
    <div class="col-md-3 elevation-5 p-3  shadow-lg">
      <router-link :to="{name: 'BugDetails', params: {bugId: bug.id }}" :title="bug.title">
        <h3 class="text-center">
          {{ bug.title }}
        </h3>
      </router-link>
    </div>
    <div class="col-md-3 elevation-5 p-3  shadow-lg">
      <ul class="card-text text-style text-center ">
        {{ bug.description }}
      </ul>
    </div>
    <div class="col-md-3 elevation-5 p-3  shadow-lg ">
      <p class="card-text text-style text-center">
        {{ bug.priority }}
        <span>
          Closed: {{ new Date(bug.closedDate).toDateString() }}
        </span>
      </p>
    </div>

    <!-- Bug Status oopen or closed -->
    <div class="col-md-3 elevation-5 p-3  shadow-lg ">
      <div class="" v-if="bug.closed == true">
        <i class="mdi mdi-circle text-success"></i>
        <span> {{ bug.closed }}</span>
      </div>
      <div class="" v-else>
        <i class="mdi mdi-circle text-danger"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Bug } from '../Models/Bug.js'
export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
