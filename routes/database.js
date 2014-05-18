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
    database.auth.distinct('tag',function(err , tagname){
        for (var x = 0; x < tagname.length ; x++){
            database.auth.find({ 'tag' : ''})
            a.push(data[x].tag)
        }
        ee.emit('group',us.uniq(a,false));

    })
}

exports.details = function(ee){
    console.log("");
}

/*function x(){
    var a = [] ;
       // b = [],
       // tagname ;
    database.auth.distinct('tag',function(err , tagname){
        console.log(tagname)
        //for (var y = 0; y < tagname.length ; y++)
            a.push(tagname);
        console.log("a =" ,a);
    });

    *//*for(var x = 0; x< a.length ; x++){
        database.auth.count({ 'tag' : a[x] },function(err, nisha){
            // a[tagname[x]] = nisha.length ;
            //console.log(tagname[x] );
           // b[a[x]] = nisha;
            console.log(nisha);

        });*//*

   // }*/
//}
/*function z(){
    var a = [];
    database.auth.distinct('tag',function(err , tagname){
        console.log(tagname); // printing tag names perfectly
        a.push(tagname);
        console.log("a =" ,a); //
        for(var x = 0; x< a.length ; x++){  //so this block is not working .
            database.auth.count({ 'tag' : a[x] },function(err, nish){
                // a[tagname[x]] = nish.length ;
            });

        });
        console.log("a =" ,a); // printing an empty array
    });
}*/

function y(){
    var a = [] ,
        b = [];
    database.auth.distinct('tag', function(err, tagname){
        for(var y =0; y< tagname.length; y++){
            a.push(tagname[y]);
        }

        console.log("a =" , a.length);
        for(var x = 0;x < a.length; x++){
            database.auth.count({ 'tag' : a[x]} , function(err, nish){
               // b[tagname[x]] = nish.length;
                console.log(a[x]);
            });
        }
        //console.log(b)
    });
}

y()