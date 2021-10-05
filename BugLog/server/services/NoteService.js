import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
// import { bugsService } from '../services/BugsService.js'
import { logger } from '../utils/Logger.js'

class NoteService {
  // async createNote(noteData) {
  //   await bugsService.getBugById(noteData.bugId)
  //   const note = await dbContext.Notes.create(noteData)
  //   await note.populate('creator')
  //   await note.populate('bug').populate
  //   return note
  // }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await dbContext.Notes.findById(note.id)
    await note.populate('creator')
    // await note.populate('bug')
    // FIXME - maybe put a virtual creator for "bug" on the model

    return note
  }

  async deleteNote(noteId, accountId) {
    const note = await dbContext.Note.findById(noteId)
    if (accountId !== note.creatorId.toString()) {
      logger.log('testing the delete on server side', accountId)
      throw new Forbidden('Not allowed to close')
    }
    await note.remove()
    return note
  }
}

export const noteService = new NoteService()
