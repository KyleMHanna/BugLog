import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'
import { logger } from '../utils/Logger.js'

class BugService {
  async createBug(bugData) {
    const bug = await dbContext.bugs.create(bugData)
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
    const bugs = await dbContext.bugs.find(query).populate('creator', 'name picture')
    return bugs
  }
}

export const bugService = new BugService()
