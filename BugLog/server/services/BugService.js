import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'
// import { logger } from '../utils/Logger.js'

class BugsService {
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    return bug
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid bugId')
    }
    return bug
  }

  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).populate('creator', 'name picture')
    return bugs
  }

  //  Edits bug (Restricted when the bug is closed)
  async editBug(bugId, userId, bugData) {
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: bugId, creatorId: userId }, bugData)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    return bug
  }
}

export const bugsService = new BugsService()
