import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
import { bugsService } from '../services/BugService.js'
// import { logger } from '../utils/Logger.js'

class NoteService {
  async createNote(noteData) {
    await bugsService.getNotesById(noteData.bugId)
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator')
    return note
  }
}

export const noteService = new NoteService()
