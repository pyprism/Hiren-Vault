/**
 * Created by prism on 5/8/14.
 */
var express = require('express');

var router = express.Router();
var database = require('./database.js');


router.get('/', function(req, res){
    res.render('newdata', {
        title: 'Add new data'
    })
});

router.post('/', function(req, res){
    database.create(req);
    res.end();
});

module.exports = router;