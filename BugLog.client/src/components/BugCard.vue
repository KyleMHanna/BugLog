<template>
  <div class="bugcard" v-if="(sort.order == 'closed' && bug.closed) || (sort.order == 'active' && !bug.closed) || (sort.order == 'all' && bug.priority) || (sort.order == 'update' && bug.updatedAt)">
    <div class="col-md-12  card ">
      <div class="container-fluid">
        <div class="row ">
          <div class="col-md-3  p-3  ">
            <router-link :to="{name: 'BugDetails', params: {bugId: bug.id }}" :title="bug.title">
              <h3 class="text-center">
                {{ bug.title }}
              </h3>
            </router-link>
          </div>
          <div class="col-md-3  p-3  ">
            <h3 class="card-text text-style text-center ">
              {{ bug.description }}
            </h3>
          </div>

          <!-- Bug priority level -->
          <div class="col-md-3  p-3  text-center ">
            <div class="text-success " v-if="bug.priority <= 2">
              <h3 class="">
                {{ bug.priority }}
              </h3>
            </div>
            <div class="text-warning" v-if="bug.priority == 3">
              <h3>{{ bug.priority }}</h3>
            </div>
            <div class="text-danger" v-if="bug.priority >= 4">
              <h3>{{ bug.priority }}</h3>
            </div>
            <span>
              Last Updated:    {{ new Date(bug.updatedAt).toLocaleString('en',date) }}
            </span>
          </div>
          <!-- Bug Status oopen or closed -->
          <div class="col-md-3  p-3  ">
            <div class="text-center " v-if="bug.closed == true">
              <i class="mdi mdi-circle mdi-48px text-success "></i>
            </div>
            <div class="text-center " v-else>
              <i class="mdi mdi-circle mdi-48px  text-danger"></i>
            </div>
          </div>
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
