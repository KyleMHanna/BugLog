import { AppState } from '../AppState.js'
import { Bug } from '../Models/Bug.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { router } from '../router'
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

  async editBug(editBug, bugId) {
    const res = await api.put(`api/bugs/${bugId}`, editBug)
    AppState.bug = new Bug(res.data)
  }

  async filterBugs() {
    AppState.bugs = AppState.bugs.filter(b => b.closed === false).reverse()
  }

  // async toggleClosed(bugId, id) {
  //   const bug = AppState.bugs.filter(t => t.id === bugId)
  //   const BugCheck = bug[0]
  //   if (BugCheck.closed === false) {
  //     BugCheck.closed = true
  //   } else {
  //     BugCheck.closed = false
  //   }
  //   const res = await api.put(`api/bugs/${bugId}`)
  //   logger.log('bug open or closed after put', res)
  // }
}

export const bugsService = new BugsService()
