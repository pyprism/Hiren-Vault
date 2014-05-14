/**
 * Created by prism on 5/8/14.
 */
var express = require('express');

var router = express.Router();
var database = require('./database.js');
var EventEmitter = require("events").EventEmitter;

var ee = new EventEmitter();

router.get('/', function(req, res){
    res.render('newdata', {
        title: 'Add new data'
    })
});

router.post('/', function(req, res){
    var statusData;
    database.create(req, ee);
    ee.on('status', function(data){
        statusData = data;
        res.render('newdata', {
            title : 'Add More Data',
            status : statusData
        })
    });
    /*res.render('newdata', {
        title : 'Add More Data',
        status : statusData
    })*/
    /*if (result == 'Save'){
        res.redirect('newdata',{
            title: 'Add More Data' ,
            status: 'Your new data is saved.You can add some more.'
        })
    }
    else if(result == 'Duplicate'){
        res.redirect('newdata',{
            title: 'Add More Data' ,
            status: 'Your inserted a duplicate data.'
        })
    }*/
    //console.log(result);
    //res.end();
});

module.exports = router;