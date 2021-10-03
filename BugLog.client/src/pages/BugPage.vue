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
            Name
          </div>
          <div class="col-md-3 card-header text-center">
            Description
          </div>

          <!-- priority sort functoinality -->
          <div class="col-md-3 card-header text-center">
            <div class="col bg-dark">
              <button class="btn selectable me-2 text-white" @click="toggleAscending">
                <i class="mdi mdi-arrow-up" v-if="ascending"></i>
                <i class="mdi mdi-arrow-down" v-else></i>
              </button>
            </div>
            <button class="btn-btn bg-dark text-light rounded shadow" @click="order('all')">
              Priority
            </button>
          </div>
          <div class="col-md-3 card-header text-center">
            <button class="btn-btn bg-success text-dark rounded" @click="order('active')">
              Open Bugs
            </button>
            <button class="btn-btn bg-danger text-dark rounded shadow" @click="order('closed')">
              Closed Bugs
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
    function scoreSorter(a, b) {
      if (ascending.value) {
        return b.score - a.score
      }
      return a.score - b.score
    }
    onMounted(() => {
      bugsService.getAllBugs()
    })
    return {
      ascending,
      account,
      bug: computed(() => AppState.bug),
      profile: computed(() => AppState.profile),
      sort: computed(() => AppState.sort),
      currentBug: computed(() => AppState.currentBug),
      bugs: computed(() => AppState.bugs.sort(scoreSorter)),
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
