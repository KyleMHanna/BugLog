<template>
  <div class="container-fluid">
    <!-- <div class="row result-controls" @contextmenu.prevent v-if="bugs.Priorty">
    </div> -->
    <div class="row">
      <button class="btn-btn bg-primary text-light selectable mt-3" data-bs-toggle="modal" data-bs-target="#bug-form">
        Add a Bug
      </button>
      <div class="containter-fluid">
        <div class="row">
          <div class="col-md-3 card-header text-center">
            Name
          </div>
          <div class="col-md-3 card-header text-center">
            Description
          </div>
          <div class="col-md-3 card-header text-center">
            <!-- This is the Priorty Sorter -->
            <div class="col bg-dark">
              <button class="btn selectable me-2 text-white" @click="toggleAscending">
                <i class="mdi mdi-arrow-up" v-if="ascending"></i>
                <i class="mdi mdi-arrow-down" v-else></i>
              </button>
            </div>
            Priorty
          </div>
          <div class="col-md-3 card-header text-center">
            open/closed
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
    const ascending = ref(true)
    function scoreSorter(a, b) {
      if (ascending.value) {
        return b.score - a.score
      }
      return a.score - b.score
    }
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      ascending,
      bugs: computed(() => AppState.bugs.sort(scoreSorter)),
      toggleAscending() {
        ascending.value = !ascending.value
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
