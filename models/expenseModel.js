const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var expenseSchema = new Schema({
   amount : {
       type : Number,
       min : 1,
       required : true
   },
   name : {
       type : String,
       required : true
   },
   category : {
       type : String,
       required : true
   },
   date : {
       type : String,
       required : true
   }
})



var Expenses = mongoose.model('Expense',expenseSchema);

module.exports = Expenses;

