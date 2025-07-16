// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    reminders: [
      {
        type: Date,
      },
    ],
    linkToNote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note', // reference to note schema
    },
    duration: {
      type: Number, // in minutes
      min: 0,
    },
    deadline: {
      type: Date,
    },
    attachments: [
      {
        type: String, // you can store URLs or file paths
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // to link the task to a specific user
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Task', taskSchema);
