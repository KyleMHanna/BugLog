import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
  }

  async createNote(note) {
    const res = await api.post('api/notes', note)
    AppState.notes.push(res.data)
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
