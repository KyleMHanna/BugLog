<template>
  <button class="btn-btn bg-success  selectable mt-3" data-bs-toggle="modal" data-bs-target="#note-form">
    <i class="mdi mdi-plus">Note</i>
  </button>
  <div class="BugDetailsPage container-fluid" v-if="currentBug.creator">
    <div class="row my-5 align-content-center">
      <div class="col-12 d-flex justify-content-center">
        <!-- FIXME -  -->
        <!-- <div class="on-hover text-end" style="right: 1rem; top: 1rem" v-if="account.id == currentBug.creatorId">
          <i class="mdi mdi-delete text-danger f-20 selectable" @click="deleteBug()"></i>
        </div> -->
        <div v-if="currentBug.creator">
          {{ currentBug.creator.name }}
          <div class="col-md-2 p-2 " v-if="currentBug.creator.picture">
            <img :src="currentBug.creator.picture" :alt="currentBug.creator.name" :title="currentBug.creator.name">
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
        // await notesService.getNotesById(route.params.bugId)
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
      bugs: computed(() => AppState.bugs),
      notes: computed(() => AppState.notes),
      note: computed(() => AppState.note)
      // async getNotes() {
      //   await notesService.getNotesById(props.bugId)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
