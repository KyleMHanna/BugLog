<template>
  <div class="card">
    <div class="row text-center">
      <div class="col-md-2 p-2">
        <!-- FIXME -->
        <!-- <img :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name"> -->
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
      <small class="text-dark">Created By: {{ note.creator }}</small>
      <br>
      <small>{{ Date(note.createdAt) }}</small>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
// import { notesService } from '../services/NotesService'
import { AppState } from '../AppState.js'
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

      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
      // async deleteNote(id) {
      //   await notesService.delete(id)
      // }
    }
  }

}
</script>

<style>

</style>
