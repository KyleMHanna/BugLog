<template>
  <div class="container-fluid">
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
import { computed, onMounted } from '@vue/runtime-core'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
export default {
  setup() {
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
