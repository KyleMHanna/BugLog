<template>
  <div class="card">
    <div class="row">
      <div class="col-md-2 p-2">
        <img :src="note.creator.picture" :alt="note.creator.name" :title="note.creator.name">
      </div>
      <div class="col-md-8">
        <div class="card-body d-flex">
          <p class="card-text  ">
            {{ note.body }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-text">
      <small class="text-light">Created By: {{ note.creator.name }}</small>
      <br>
      <small>{{ Date(note.createdAt) }}</small>
    </div>
  </div>
</template>

<script>
import { notesService } from '../services/NotesService'
export default {
  setup() {
    return {
      async deleteNote(id) {
        await notesService.delete(id)
      }
    }
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
