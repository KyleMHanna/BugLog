<template>
  <button class="btn-btn  selectable mt-3" data-bs-toggle="modal" data-bs-target="#note-form">
    Comment
  </button>
  <button class=" btn-outline-success  text-dark   mt-3" data-bs-toggle="modal" data-bs-target="#currentbug-form" v-if="currentBug.closed ==true">
    Edit Bug
  </button>
  <button class="btn-btn  rounded shadow" title="Track Bug" v-if="!trackedbugs" @click="trackBug(currentBug.id)">
    Track
  </button>

  <!-- <button class="btn-btn bg-danger  rounded shadow" title="un Track Bug" @click="removeTrackedBug(trackedbugs.id)" v-else>
    Remove
  </button> -->

  <button class="btn-btn bg-danger  selectable mt-3" title="Close" @click="close()" v-if="currentBug.closed==true">
    close
  </button>
  <button class="btn-btn  selectable mt-3 " title="Open" @click="close()" v-else>
    open
  </button>
  <!-- FIXME -->
  <div v-if="trackedbugs">
    <p>Users Tracking </p>
    {{ trackedbugs.tracker.name }}
  </div>
  <!-- FIXME -->
  <div class="BugDetailsPage container-fluid" v-if="currentBug.creator">
    <div class="row my-5 align-content-center">
      <div class="col-12 d-flex justify-content-center">
        <!-- FIXME -  -->
        <!-- <div class="on-hover text-end" style="right: 1rem; top: 1rem" v-if="account.id == currentBug.creatorId">
          <i class="mdi mdi-delete text-danger f-20 selectable" @click="deleteBug()"></i>
        </div> -->
        <div v-if="currentBug.creator">
          Reported by: {{ currentBug.creator.name }}
          <div class="col-md-2 p-2 " v-if="currentBug.creator.picture">
            <img class="rounded" :src="currentBug.creator.picture" :alt="currentBug.creator.name" :title="currentBug.creator.name">
          </div>
        </div>
        <div class="d-flex  p-2">
          <h1 class="my-auto">
            {{ currentBug.title }}
          </h1>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class=" p-2  text-center">
        {{ currentBug.description }}
      </div>
      <div>
        <div class="  p-3   ">
          <p class="text-center">
            Priority level {{ currentBug.priority }}
            <br>
            <span>
              Closed:     {{ new Date(currentBug.updatedAt).toLocaleString() }}
            </span>
          </p>
          <div class="text-center " v-if="currentBug.closed == true">
            <i class="mdi mdi-circle mdi-48px text-success "></i>
          </div>

          <div class="text-center " v-else>
            <i class="mdi mdi-circle mdi-48px  text-danger"></i>
          </div>
        </div>
      </div>
    </div>

    <NoteCard v-for="note in notes" :key="note.id" :note="note" />

    <Modal id="currentbug-form">
      <template #modal-title>
        Edit Bug
      </template>
      <template #modal-body>
        <CurrentBugForm />
      </template>
    </Modal>
    <Modal id="note-form">
      <template #modal-title>
        Add a note
      </template>
      <template #modal-body>
        <NoteForm />
      </template>
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
import { notesService } from '../services/NotesService.js'

export default {

  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
        await bugsService.getTrackedBugs(route.params.bugId)
        await notesService.getBugNotes(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    async function getBugNotes() {
      if (route.params.bugId) {
        await bugsService.getBugById(route.params.bugId)
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await notesService.getBugNotes(route.params.id)
        getBugNotes()
        this.getNotesById()
      }
    })
    return {
      route,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      currentBug: computed(() => AppState.currentBug),
      trackedbugs: computed(() => AppState.trackedbugs.find(b => b.accountId === AppState.account.id)),
      bugs: computed(() => AppState.bugs),
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes),
      note: computed(() => AppState.note),
      tracked: computed(() => AppState.tracked),
      async close() {
        this.currentBug.closed = !this.currentBug.closed
        await bugsService.toggleClosed(route.params.bugId)
      },
      async trackBug(id) {
        try {
          await bugsService.createTrackedBug(id)
        } catch (error) {
          Pop.toast('Cant Track a bug twice')
        }
      },
      async removeTrackedBug(id) {
        try {
          await bugsService.deleteTrackedBug(id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
