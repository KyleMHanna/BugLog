import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugsSchema = new Schema(
  {
    bugId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    tracker: { type: Schema.Types.ObjectId, ref: 'tracker', required: true },
    bug: { type: Schema.Types.ObjectId, ref: 'bug', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TrackedBugsSchema.virtual('bug', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

TrackedBugsSchema.virtual('tracker', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
