var mongoose = require('mongoose');
var User = require("./user.js")

var BarSchema = new mongoose.Schema({
  name:     { type: String,  required: true },
  neighborhood: { type: String, required: true },
  address: { type: String, required: false },
  hours: { type: String, required: false },
  beers: [],
  lastEditedBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  { timestamps: true }  // createdAt, updatedAt
);

// function date2String(date) {
//   var options = {
//     weekday: 'long', year: 'numeric', month: 'short',
//     day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
//   };
//   return date.toLocaleDateString('en-US', options);
// }

// TodoSchema.methods.getCreatedAt = function() {
//   return date2String(this.createdAt);
// };

// TodoSchema.methods.getUpdatedAt = function() {
//   return date2String(this.updatedAt);
// };

// TodoSchema.methods.toString = function() {
//   let status = this.completed ? 'completed' : 'not completed';
//   return `Todo: ${this.title} owned by ${this.user.local.email} is ${status}.`;
// };

module.exports = mongoose.model('Bar', BarSchema);
