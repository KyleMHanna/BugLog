<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row my-5 align-content-center" v-if="currentBug">
      <div class="col-12 d-flex justify-content-center">
        <!-- FIXME -  -->
        <!-- <div class="col-md-2">
          <img :src="currentBug.creator.picture" class="rounded-circle image-fluid img-thumbnail img-height shadow">
          <p>{{ currentBug.creator.name }}</p>
        </div> -->
        <div class="d-flex shadow p-2">
          <h1 class="my-auto">
            {{ currentBug.title }}
          </h1>
        </div>
      </div>
    </div>
    <div class="row justify-content-center rounded">
      <div class=" bg-light p-2 shadow rounded text-center">
        {{ currentBug.description }}
      </div>
      <div>
        <div class=" elevation-5 p-3  shadow-lg ">
          <p class="card-text text-style text-center">
            Priority level {{ currentBug.priority }}
            <br>
            <span>
              Closed:     {{ new Date(currentBug.updatedAt).toLocaleString('en',date) }}
            </span>
          </p>
          <div class="text-center selectable" v-if="currentBug.closed == true">
            <i class="mdi mdi-circle mdi-48px text-success "></i>
            <span> {{ currentBug.closed }}</span>
          </div>
          <div class="text-center selectable" v-else>
            <i class="mdi mdi-circle mdi-48px  text-danger"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
// import { Bug } from '../Models/Bug.js'

export default {
  // props: {
  //   bug: { type: Bug, required: true }
  // },
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      currentBug: computed(() => AppState.currentBug),
      bugs: computed(() => AppState.bugs)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
