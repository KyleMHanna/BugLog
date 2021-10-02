import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TrackedBugsSchema = new Schema(
  {
    bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TrackedBugsSchema.virtual('bug', {
  localField: 'bugId',
  foreignField: '_id',
  ref: 'Bug',
  justOne: true
})

TrackedBugsSchema.virtual('tracker', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
