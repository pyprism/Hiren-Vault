/**
 * Created by prism on 5/9/14.
 */

var bcrypt = require('bcrypt');
/*
Encryption for master pass
*/

exports.masterCreate = function(pass){
    bcrypt.genSalt(20, function(err, salt) {
        bcrypt.hash(pass, salt, function(err, hash) {
            console.log(hash);
            console.log(salt);
        });
    });
}

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("hello", salt, function(err, hash) {
        console.log(hash);
        console.log(salt);
    });
});

//hash $2a$10$fsol23ebcTtxInbju3Pqf.yOAoCiZ5j2gLllIp/S77Lf06E1eXJZS
// salt $2a$10$fsol23ebcTtxInbju3Pqf.

bcrypt.compare("hello", '$2a$10$fsol23ebcTtxInbju3Pqf.yOAoCiZ5j2gLllIp/S77Lf06E1eXJZS', function(err, res) {
    console.log(res);
});