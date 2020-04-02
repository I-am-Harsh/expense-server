var express = require('express');
var expenseRouter = express.Router();
var Expense = require('../models/expenseModel');
var mongoose = require('mongoose');


// create store for id
var id = ''

expenseRouter

// get all the expense
.get('/', (req,res) =>{
    Expense.find()
    .then((result) => {
        res.json(result);
    })
})

// add new expense
.post('/add', (req,res) =>{
    console.log("BODY : ",req.body);
    Expense.create(req.body)
    .then((result) =>{
        console.log("Document ID : ",result._id);
        res.json({success : "success", _id : result._id})
    })
    .catch(err => console.log(err));
})


// delete an expense
.delete('/delete/:deleteId', (req,res) => {
    console.log(req.params.deleteId);
    
    Expense.deleteOne({_id : req.params.deleteId})
    .then((result) => {
        res.send(result)

    })
    .catch(err => console.log(err));
})


// get total budget and category





module.exports = expenseRouter