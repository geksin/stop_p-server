const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
  datastart: {
    type: Date,
    default:Date.now
    },
  dataend: {
    type: Date
    },
  gameUsers: [{
    userID: {
      type: String
      },
    dataUserEnd: {
      type: Date
      }
    }],
  gameComments: [{
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    comments: {
      type: String
    },
    dateComments: {
      type: Date
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
  }]
});

// const arrayUsers = new Schema({
//   userID: {
//     type: String
//     },
//   dataend: {
//     type: Date
//     }
//   });

// const arrayComments = new Schema({
//   owner: {
//     type: String
//     },
//   message:{
//     type: String
//   },
//   created: {type: Date, default:Date.now},
//   ingame:  { type: Boolean}

//   });


module.exports = mongoose.model('game', gameSchema);
