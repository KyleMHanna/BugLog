import { Auth0Provider } from '@bcwdev/auth0provider'
import { trackedBugsService } from '../services/TrackedBugsService.js'
import BaseController from '../utils/BaseController.js'
import { logger } from '../utils/Logger.js'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.deleteTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      logger.log('current creator', req.userInfo)
      const trackedbug = await trackedBugsService.createTrackedBug(req.body)
      res.send(trackedbug)
    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedBug(req, res, next) {
    try {
      const trackedbug = await trackedBugsService.deleteTrackedBug(req.params.trackedBugId, req.params.accountId)
      res.send(trackedbug)
    } catch (error) {
      next(error)
    }
  }
}
