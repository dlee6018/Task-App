const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      require:true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;