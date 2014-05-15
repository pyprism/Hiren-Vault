/**
 * Created by prism on 5/14/14.
 */
/*var favicon2PNG = require('favicon2png');
var fs = require('fs');

var location = '../public/icon/';
favicon2PNG.readFile('https://www.facebook.com', function (err, data) {
    if (err) throw err;
    fs.writeFile('message.png', data, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});*/

var favicon = require('favicon');

favicon("http://facebook.com/", function(err, favicon_url) {
    console.log(favicon_url);
});
