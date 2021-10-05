import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { bugsService } from '../services/BugsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/trackedbugs', this.getUserTrackedBugs)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserTrackedBugs(req, res, next) {
    try {
      const bugs = await bugsService.getTrackedBugsByAccount(req.userInfo.id)
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }
}
