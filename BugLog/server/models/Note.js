import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    body: { type: String, required: true },
    bugId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
