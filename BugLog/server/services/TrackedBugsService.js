import { bugsService } from '../services/BugsService.js'
import { Forbidden } from '../utils/Errors.js'
import { dbContext } from '../db/DbContext.js'

class TrackedBugsService {
  async createTrackedBug(trackedBugData, bugId) {
    await bugsService.getBugById(trackedBugData.bugId)

    if (trackedBugData.bugId === 'bug') {
      throw new Forbidden('Bug has already been tracked')
    }
    const trackedbug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedbug.populate('tracker')
    await trackedbug.populate('bug')
    return trackedbug
  }

  async deleteTrackedBug(trackedBugId, userId) {
    const trackedBug = await dbContext.TrackedBugs.findByIdAndDelete(trackedBugId)
    if (userId !== trackedBug.creatorId.toString()) {
      throw new Forbidden('Not allowed to close')
    }
    await trackedBug.remove()
    return trackedBug
  }
}

export const trackedBugsService = new TrackedBugsService()
