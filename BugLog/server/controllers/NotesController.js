import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService.js'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await noteService.createNote(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await noteService.deleteNote(req.params.noteId, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}

//   async deleteNote(req, res, next) {
//     try {
//       const note = await notesService.deleteNote(req.params.id, req.userInfo.id)
//       return res.send({ message: 'Deleted note', data: note })
//     } catch (error) {
//       next(error)
//     }
//   }
// }
