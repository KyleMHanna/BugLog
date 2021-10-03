import { AppState } from '../AppState.js'
import { Bug } from '../Models/Bug.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { router } from '../router'

class BugsService {
  async getBugs(query = '') {
    AppState.bugs = []
    const res = await api.get('api/bugs' + query)
    AppState.bugs = res.data.map(b => new Bug(b))
  }

  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getBugsById(bugId) {
    AppState.bug = null
    const res = await api.get(`api/bugs/${bugId}`)
    logger.log(res, '⚠ Getting bug by bugId')
    AppState.bug = new Bug(bugId)
  }

  async createBug(bugId) {
    const res = await api.post('api/bugs', bugId)
    this.getAllBugs()
    AppState.bugs.push(new Bug(res.data))
    router.push({ name: 'BugDetails', params: { bugId: res.data.id } })
  }

  // FIXME -
  // router.push({ name: 'BugDetailsPage', params: { bugId: res.data.id } })

  async filterBugs() {
    AppState.bugs = AppState.bugs.filter(b => b.closed === false).reverse()
  }
}

export const bugsService = new BugsService()
