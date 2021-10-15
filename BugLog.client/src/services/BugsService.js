import { AppState } from '../AppState.js'
import { Bug } from '../Models/Bug.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { router } from '../router'
// import { TrackedBug } from '../Models/TrackedBug.js'
// import { convertToQuery } from '../utils/Query'
// import { Pop } from '../utils/Pop.js'

class BugsService {
  async getBugs(query = '') {
    const res = await api.get('api/bugs' + query)
    AppState.bugs = res.data.map(b => new Bug(b))
    AppState.currentBug = new Bug(res.data)
  }

  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.currentBug = res.data
  }

  // TODO - make sure this is functioning properly
  async createBug(bug) {
    const res = await api.post('api/bugs', bug)
    AppState.bug.push(new Bug(res.data))
    router.push({ name: 'BugDetails', params: { bugId: res.data.id } })
  }

  async createTrackedBug(id) {
    const res = await api.post('api/trackedbugs', { bugId: id })
    AppState.trackedbugs.push(res.data)
    logger.log('💀 Tracked bug', res)
  }

  async unTrackBug(trackedBugId) {
    try {
      const res = await api.delete(`api/trackedbugs/${trackedBugId}`)
      AppState.trackedbugs = res.data
    } catch (error) {
      logger.log('💀 unTracked bug bugs service', error)
    }
  }

  async getTrackedBugs(bugId) {
    AppState.trackedbugs = []
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    AppState.trackedbugs = res.data
  }

  async editBug(editBug, bugId) {
    const res = await api.put(`api/bugs/${bugId}`, editBug)
    AppState.bug = new Bug(res.data)
    AppState.currentBug = res.data
  }

  async filterBugs() {
    AppState.bugs = AppState.bugs.filter(b => b.closed === false).reverse()
  }

  async toggleClosed(bugId, currentBug) {
    try {
      const res = await api.delete('api/bugs/' + bugId, currentBug)
      logger.log(res.data, 'closed toggleClosed 💀')
      // AppState.currentBug = res.data
    } catch (error) {
      logger.log('💀 toggleClosed bug bugs service', error)
    }
  }

  async deleteTrackedBug(id) {
    const trackedbugs = AppState.trackedbugs
    const currenttracked = trackedbugs.find(t => t.accountId === id)
    const res = await api.delete(`api/trackedbugs/${currenttracked.id}`)
    logger.log('tracked delete', res)
    AppState.trackedbugs = AppState.trackedbugs.filter(t => t.id !== currenttracked.id)
  }
}

export const bugsService = new BugsService()
