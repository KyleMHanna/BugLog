<template>
  <div class="card" v-if="note.creator">
    <div class="row text-center">
      <div class="on-hover" v-if="note.creatorId === account.id">
        <button class="btn text-dark lighten-20 selectable" title="remove note" @click="remove(note.id)">
          Remove note
        </button>
      </div>
      <div class="col-md-1 px-3 ">
        <img :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name">
      </div>
      <div class="col-md-10 text-center  px-4">
        <h3>{{ note.body }}</h3>
      </div>
    </div>
    <div class=" text-center ">
      <small class="text-dark">Created By: {{ note.creator.name }}</small>
      <br>
      <small>{{ Date(note.createdAt) }}</small>
    </div>
    <div class="col-md-1"></div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
// import { notesService } from '../services/NotesService'
import { AppState } from '../AppState.js'
// import Pop from '../utils/Pop.js'
import { notesService } from '../services/NotesService.js'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      notes: computed(() => AppState.notes),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      async remove(noteId) {
        await notesService.deleteNote(noteId)
      }
    }
  }
}

</script>

<style>

</style>
