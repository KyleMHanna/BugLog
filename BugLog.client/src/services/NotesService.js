import { AppState } from '../AppState.js'
// import { Note } from '../Models/Note.js'
import Pop from '../utils/Pop.js'
// import { logger } from '../utils/Logger'
import { api } from './AxiosService.js'

class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data
  }

  async createNote(note) {
    const res = await api.post('api/notes', note)
    AppState.notes.push(res.data)
    // this.getNotesByBugId(bugId)
  }

  async deleteNote(noteId) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/notes/' + noteId)
        Pop.toast(res.data.messsage, 'success')
        AppState.notes = AppState.notes.filter(n => n.noteId !== noteId)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }
}
export const notesService = new NotesService()
