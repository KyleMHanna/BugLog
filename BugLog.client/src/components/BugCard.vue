<template>
  <div class="container-fluid">
    <div class="row px-0">
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

      <!-- Bug priority level -->
      <div class="col-md-3 elevation-5 p-3  shadow-lg ">
        <p class="card-text text-style text-center">
          {{ bug.priority }}
          <span>
            Closed:     {{ new Date(bug.updatedAt).toLocaleString('en',date) }}
          </span>
        </p>
      </div>

      <!-- Bug Status oopen or closed -->
      <div class="col-md-3 elevation-5 p-3  shadow-lg ">
        <div class="text-center selectable" v-if="bug.closed == true">
          <i class="mdi mdi-circle mdi-48px text-success "></i>
          <span> {{ bug.closed }}</span>
        </div>
        <div class="text-center selectable" v-else>
          <i class="mdi mdi-circle mdi-48px  text-danger"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
// import { Bug } from '../Models/Bug.js'
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    return {
      date: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      bugs: computed(() => AppState.bugs),
      sort: computed(() => AppState.sort),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
