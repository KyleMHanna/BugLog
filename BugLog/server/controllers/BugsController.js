import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService.js'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBug)
      .get('/:bugId/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('/:bugId/trackedbugs', this.getTrackedBugs)
      .put('/:bugId', this.editBug)
      .delete('/:bugId', this.deleteBug)
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs(req.query)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBug(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.bugId)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const note = await bugsService.getNotesById(req.params.bugId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getTrackedBugs(req, res, next) {
    try {
      const bugs = await bugsService.getTrackedBugs(req.params.bugId)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      logger.log('who is the user?', req.userInfo)
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugsService.editBug(req.params.bugId, req.userInfo.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const bug = await bugsService.closeBug(req.params.bugId, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
      logger.error('deleteBug error on bugscontroller', error)
    }
  }
}
