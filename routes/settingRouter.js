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
        console.log("id from get : ",id)
        res.json(result);
        // if(!id.length){
        //     General.create(0)
        //     .then(result => {
        //         console.log("created")
        //         id = result._id
        //         console.log("The new created id : ", id)
        //     })
        // }
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
            .then(result => {
                
                id = result._id
                console.log("New budget created ", id)
                res.json({success : "success"})
            })
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})

// add category

.post('/category', (req,res) => {
    General.find()
    .then((result) => {
        if(result.length){
            General.findByIdAndUpdate(id, 
                {$addToSet : {category : req.body.category}}
            )
            .then(result => {
                console.log(result);
                res.json({success : "success"})
            })
            .catch(err => res.json({success : "failure"}))
        }
        else{
            console.log(req.body);
            General.create(req.body)
            .then(result => {
                console.log(result)
                id = result._id
                res.send({success : "success"})
            })
        }
    })
    
})


// delete a category and all its related expense
.delete('/category/:index', (req, res) => {
    console.log(req.params.index)
    General.updateOne({},{
        $pullAll : {category : [req.params.index]}
    })
    .then(result => res.json({success : "success"}))
    .catch(err => res.json({success : "failute"}));
})


module.exports = settingRouter
