/**
 * Created by prism on 5/14/14.
 */
var express = require('express');

var router = express.Router();
var EventEmitter = require("events").EventEmitter;

var ee = new EventEmitter();
var database = require('./database.js');

router.get('/', function(req, res){
    database.group(ee);
    ee.on('group', function(tag){
        res.render('getgroup', {
            title : 'All your secret sauces',
            tag : tag
        })
    });
});





module.exports = router;