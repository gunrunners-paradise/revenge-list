const mongoose = require('mongoose');
const lists = require('../controllers/lists');

const ListSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, 'please provide name'],
            minlength: 3,
            maxlength: 50
      },
      offense: {
            type: String,
            required: [true, 'please provide offense'],
            maxlength: 200
      },
      revenge_plan: {
            type: String,
            required: [true, 'please provide revenge plan'],
            maxlength: 600
      },
      severity: {
            type: Number,
            default: 1,
            min: 1,
            max: 5
      },
      status: {
            type: String,
            enum: {
                  values: ['Planning', 'Approved', 'Executed', 'Abandoned'],
                  message: '{VALUE} not supported'
            },
            default: 'Planning'
      },
      due_date: {
            type: String,
            required: [true, 'please provide due date'],
            maxlength: 50
      },
      createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']

      }
});

module.exports = mongoose.model('Lists', ListSchema);