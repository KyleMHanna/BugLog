import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'
// import { logger } from '../utils/Logger.js'

class BugsService {
  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid bugId')
    }
    return bug
  }

  async getNotesById(bugId) {
    const bug = await dbContext.Notes.findById(bugId).populate('creator')
    if (!bug) {
      throw BadRequest('invalid Id')
    }
  }

  async getBugs(query) {
    const bugs = await dbContext.Bugs.find(query).sort('-createdAt').populate('creator')
    return bugs
  }

  //  Edits bug (Restricted when the bug is closed)
  async editBug(bugId, userId, bugData) {
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: bugId, creatorId: userId }, bugData)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    bug.title = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.priority = bugData.priority || bug.priority
    await bug.save()
    return bug
  }

  async closeBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (bug.closed === true) { return }
    bug.closed = true
    await bug.save()
    return bug
  }
}

export const bugsService = new BugsService()
