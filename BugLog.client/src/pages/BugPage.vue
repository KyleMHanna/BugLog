<template>
  <!-- <div class="row result-controls" @contextmenu.prevent v-if="bugs.Priorty">
    </div> -->
  <!-- <button class="btn-btn bg-success  selectable mt-3" data-bs-toggle="modal" data-bs-target="#bug-form">
      <i class="mdi mdi-plus">Bug</i>
    </button> -->
  <div class="container-fluid">
    <div class="row">
      <div class="containter-fluid">
        <div class="row">
          <div class="col-md-3 card-header text-center">
            <h5>
              Name
            </h5>
          </div>
          <div class="col-md-3 card-header text-center">
            <h5>
              Description
            </h5>
          </div>

          <!-- priority sort functoinality -->
          <div class="col-md-3 card-header text-center">
            <div class="">
              <button class="btn selectable me-2 text-white" @click="toggleAscending">
                <i class="mdi mdi-arrow-up text-success mdi-24px" v-if="ascending"></i>
                <i class="mdi mdi-arrow-down text-danger mdi-24px" v-else></i>
              </button>
            </div>
            <!-- <button class="btn-btn bg-dark text-light rounded shadow" @click="order('all')">
              Priority
            </button> -->
          </div>
          <div class="col-md-3 card-header text-center p-2">
            <button class="btn-outline-danger  text-dark p-2 " @click="order('active')">
              Closed
            </button>

            <button class="btn-outline-success  text-dark p-2 " @click="order('closed')">
              Open
            </button>
          </div>
        </div>
      </div>
      <BugCard v-for="bug in bugs" :key="bug.id" :bug="bug" />
    </div>
  </div>

  <Modal id="bug-form">
    <template #modal-title>
      Add a Bug
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
export default {
  setup() {
    const account = computed(() => AppState.account)
    const ascending = ref(true)
    const lowFilter = ref(false)
    function lowFilterFunction(b) {
      if (lowFilter.value) {
        return b.priority > 2
      }
      return true
    }
    function scoreSorter(a, b) {
      if (ascending.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }
    onMounted(() => {
      bugsService.getAllBugs()
    })
    return {
      ascending,
      lowFilter,
      account,
      bug: computed(() => AppState.bug),
      profile: computed(() => AppState.profile),
      sort: computed(() => AppState.sort),
      currentBug: computed(() => AppState.currentBug),
      bugs: computed(() => AppState.bugs.filter(lowFilterFunction).sort(scoreSorter)),
      toggleAscending() {
        ascending.value = !ascending.value
      },
      order(status) {
        AppState.sort.order = status
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
