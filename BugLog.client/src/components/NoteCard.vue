<template>
  <div class="card" v-if="note.creator">
    <div class="row text-center">
      <div class="on-hover col-md-1 " v-if="note.creatorId === account.id">
        <button class="btn text-dark lighten-20 selectable" @click="remove(note)">
          <b>
            Remove note
          </b>
        </button>
      </div>
      <div class="col-md-1 p-2 ">
        <img :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name">
      </div>
      <div class="col-md-8 text-center">
        <div class="card-body  text-center ">
          <p class="card-text text-center ">
            {{ note.body }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-text text-center ">
      <small class="text-dark">Created By: {{ note.creator.name }}</small>
      <br>
      <small>{{ Date(note.createdAt) }}</small>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
// import { notesService } from '../services/NotesService'
import { AppState } from '../AppState.js'
import Pop from '../utils/Pop.js'
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
      async remove(note) {
        await notesService.deleteNote(note.id)
      }
    }
  }
}

</script>

<style>

</style>
