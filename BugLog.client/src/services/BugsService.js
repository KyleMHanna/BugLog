import { AppState } from '../AppState.js'
import { Bug } from '../Models/Bug.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class BugsService {
  async getBugs(query = '') {
    AppState.bugs = []
    const res = await api.get('api/bugs' + query)
    AppState.bugs = res.data.map(b => new Bug(b))
  }

  async getBugsById(bugId) {
    AppState.bug = null
    const res = await api.get(`api/bugs/${bugId}`)
    logger.log(res, '⚠ Getting bug by bugId')
    AppState.bug = new Bug(bugId)
  }

  async createBug(bug) {
    const res = await api.post('api/bugs', bug)
    AppState.bugs.push(new Bug(res.data))
  }
}

export const bugsService = new BugsService()
