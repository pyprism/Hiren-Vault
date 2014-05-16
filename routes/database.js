/**
 * Created by prism on 5/9/14.
 */

var mongoose = require( 'mongoose' );
var database = require('../model/hiren-conf');
var us = require('underscore')._;

exports.create = function(req, ee){
    var instance = new database.auth();
    if(req.body.tag && req.body.email){
        database.auth.findOne({ 'tag' : req.body.tag , 'email' : req.body.email}, function(err , duplicate){
            if (!err){
                if(!duplicate){
                    instance.tag = req.body.tag;
                    instance.email = req.body.email;
                    instance.username= req.body.username;
                    instance.createdOn = Date.now();
                    instance.url = req.body.url;
                    instance.password = req.body.password;
                    instance.save(function(err){
                        if(!err) console.log('Saved');

                    });
                    ee.emit('status', 'Your data is saved. Add some more?');

            }       else {
                    console.log("Duplicate");
                    ee.emit('status', 'You entered duplicate data. Add some more?');
                };
        } else console.log(err);
        });

        }

    };

exports.group = function(ee){
    var a = [];
    database.auth.find({},{'tag' : 1 , '_id' : 0 },function(err , data){
        for (var x = 0; x < data.length ; x++){
            //a.push[data[x]];
            a.push(data[x].tag)
        }
        ee.emit('group',us.uniq(a,false));

    })
}
