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
    ee.on('data', function(data){
        statusData = data;
        res.render('newdata', {
            title : 'Add More Data',
            list: data
        })
    });

});

module.exports = router;