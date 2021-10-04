import { AppState } from '../AppState.js'
import { Note } from '../Models/Note.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService.js'

class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data
  }

  // async createNote(note) {
  //   const res = await api.post('api/notes', note)
  //   AppState.notes.push(res.data)
  //   // this.getNotesByBugId(bugId)
  // }
  async getBugNotes(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    logger.log('the res', res.data)
    AppState.notes = res.data
  }

  async getNotesById(bugId) {
    try {
      AppState.note = null
      const res = await api.get(`api/notes/${bugId}`)
      AppState.note = new Note(res.data)
      this.getNotesByBugId(bugId)
    } catch (error) {
      logger.log('getNotesById notes service error', error)
    }
  }

  async createNote(newNote) {
    try {
      const res = await api.post('api/notes', newNote)

      AppState.notes.push(new Note(res.data))
      Pop.toast('success')
    } catch (error) {
      logger.log('notes Service error', error)
    }
  }

  async deleteNote(noteId) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/notes/' + noteId)
        Pop.toast(res.data.messsage, 'success')

        AppState.notes = AppState.notes.filter(n => n.id !== noteId)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}
export const notesService = new NotesService()
