import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
import { bugsService } from '../services/BugsService.js'
// import { logger } from '../utils/Logger.js'

class NoteService {
  async createNote(noteData) {
    await bugsService.getBugById(noteData.bugId)
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator')
    await note.populate('bug').populate
    return note
  }

  // async createNote(noteData) {
  //   const note = await dbContext.Note.create(noteData)
  //   await dbContext.Note.findById(note.id)
  //   await note.populate('creator').populate
  //   await note.populate('bug').populate

  //   return note
  // }

  async deleteNote(noteId, userId) {
    const note = await dbContext.Notes.findByIdAndRemove(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('Not allowed to close')
    }
    await note.remove()
    return note
  }
}

export const noteService = new NoteService()
