var express = require('express')
var settingRouter = express.Router();
var mongoose = require('mongoose')
var General = require('../models/categoryModel');

var id = '';
settingRouter

// get everything
.get('/budget', (req,res) => {
    General.find()
    .then(result => {
        id = result.map(result => result.id)
        res.json(result);
    })
    .catch(err => res.send(err))
})


// add the total budget
.post('/add/budget', (req,res) => {
    General.find()
    .then((result) => {
        console.log(result);
        if(result.length){
            General.findByIdAndUpdate(id, {totalBudget : req.body.totalBudget})
            .then(result => {
                console.log(result)
                res.json({success : "success"});
            })
            .catch(err => res.json(err));
        }
        else{
            General.create(req.body)
            .then(result => res.json({success : "success"}))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})

// add category

.post('/category', (req,res) => {
    General.findByIdAndUpdate(id, 
        {$addToSet : {category : req.body.category}}
    )
    .then(result => {
        res.json({success : "success"})
    })
    .catch(err => res.json({success : "failure"}))
})


// delete a category and all its related expense
.delete('/category/:index', (req, res) => {
    console.log(req.params.index)
    General.updateOne({},{
        $pull : {category : [req.params.index]}
    })
    .then(result => res.json({success : "success"}))
    .catch(err => res.json({success : "failute"}));
})


module.exports = settingRouter
