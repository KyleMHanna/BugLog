// import { bugsService } from '../services/BugsService.js'
import { Forbidden, BadRequest } from '../utils/Errors.js'
import { dbContext } from '../db/DbContext.js'

class TrackedBugsService {
  async createTrackedBug(body, oldTracked, accountId) {
    for (let i = 0; i < oldTracked.length; i++) {
      const check = oldTracked[i]
      if (check.accountId.toString() === accountId) {
        throw new BadRequest("can't track bugs more than once")
      }
    }
    const newTracked = await dbContext.TrackedBugs.create(body)
    await newTracked.populate('bug')
    await newTracked.populate('tracker')
    return newTracked
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
