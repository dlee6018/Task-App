const mongoose = require("mongoose")

const requestSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      timeLimit: {
          type: Number,
          required: true,
          default: 0
      },
      isCompleted:{
          type:Boolean,
          required: true,
          default:false,
      },
      progressUser:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
      },
      progressCompleted: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      timestamps: true,
    }
  )
  
  const Request = mongoose.model('Request', requestSchema)
  
module.exports = Request
  