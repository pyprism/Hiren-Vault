/**
 * Created by prism on 5/9/14.
 */

var mongoose = require( 'mongoose' );
var auths = require('../model/hiren-conf');

exports.create = function(req){
    var instance = new auths.auth();
    if(req.body.tag && req.body.email){
        auths.auth.findOne({ 'tag' : req.body.tag , 'email' : req.body.email}, function(err , duplicate){
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
                    return "Save";

            }       else return "Duplicate";
        } else console.log(err);
        });

        }

    };

