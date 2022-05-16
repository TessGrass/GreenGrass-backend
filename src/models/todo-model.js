import mongoose from 'mongoose'
const Schema = mongoose.Schema

const todoSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  completed: {
    type: Boolean,
    required: true,
    trim: true
  }

}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

todoSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Todo = mongoose.model('Todo', todoSchema)
