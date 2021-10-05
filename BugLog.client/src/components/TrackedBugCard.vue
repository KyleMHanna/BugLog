<template>
  <div class="container-fluid">
    <div class="row">
      <!-- <div v-if="trackedbugs"> -->
      <div class="col-md-3  p-3  ">
        <h3 class="text-center">
          {{ bug.bug.title }}
        </h3>
      </div>
      <div class="col-md-3  p-3  ">
        <h3 class="card-text text-style text-center ">
          {{ bug.bug.description }}
        </h3>
      </div>
    </div>
  </div>
  <!-- </div> -->

  <!-- Bug priority level -->
  <!-- <div class="col-md-3  p-3  text-center ">
          <div class="text-success " v-if="trackedbugs.priority <= 2">
            <h3 class="">
              {{ trackedbugs.priority }}
            </h3>
          </div>
          <div class="text-warning" v-if="trackedbugs.priority == 3">
            <h3>{{ trackedbugs.priority }}</h3>
          </div>
          <div class="text-danger" v-if="trackedbugs.priority >= 4">
            <h3>{{ trackedbugs.priority }}</h3>
          </div>
        </div> -->
  <!-- Bug Status oopen or closed -->
  <!-- <div class="col-md-3  p-3  ">
        <div class="text-center " v-if="trackedbugs.closed == true">
          <i class="mdi mdi-circle mdi-48px text-success "></i>
        </div>
        <div class="text-center " v-else>
          <i class="mdi mdi-circle mdi-48px  text-danger"></i>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
// import { computed } from '@vue/runtime-core'
// import { AppState } from '../AppState.js'
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    return {
      // account: computed(() => AppState.account),
      // trackedbugs: computed(() => AppState.trackedbugs),
      // bugs: computed(() => AppState.trackedbugs)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
