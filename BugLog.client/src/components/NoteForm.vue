<template>
  <form @submit.prevent="createNote()">
    <div class="form-group">
      <label for="title">Note Details</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="Enter Note Here"
             v-model="editable.body"
             required
      >
    </div>
    <div class="form-group">
      <div class="d-flex justify-content-between my-3">
        <button type="submit" class="btn btn-success mt-2">
          Create
        </button>
      </div>
    </div>
  </form>
</template>

<script>

import { notesService } from '../services/NotesService.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { Modal } from 'bootstrap'
import { Bug } from '../Models/Bug.js'

import { ref } from '@vue/reactivity'
// import { useRoute } from 'vue-router'

export default {
  props: {
    bug: { type: Bug, required: true }
  },
  setup(props) {
    const editable = ref({})
    // const route = useRoute()
    return {
      editable,

      async createNote() {
        try {
          await notesService.createNote(editable.value, props.bugId)
          editable.value = {}
          Pop.toast('Added', 'success')
          const modal = Modal.getInstance(document.getElementById('note-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error)
        }
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
  </style>
