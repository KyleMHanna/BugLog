import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async TrackedBugs() {
    const res = await api.get('/account/trackedbugs')
    AppState.trackedbugs = res.data

    // TODO not sure if ^ works
    logger.log('💀 tracked bugs in account service')
  }
}

export const accountService = new AccountService()
