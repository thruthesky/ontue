var fs = require('fs');
var d = new Date();
var hash = d.getFullYear() + d.getMonth() + d.getDay() + '-' + d.getHours() + d.getMinutes() + d.getSeconds();
var new_main_js = 'main-' + hash + '.js';
fs.rename('www/build/main.js', 'www/build/' + new_main_js, function(err) {
    if ( err ) console.log('ERROR: ' + err);
});

var new_main_css = 'main-' + hash + '.css';
fs.rename('www/build/main.css', 'www/build/' + new_main_css , function(err) {
    if ( err ) console.log('ERROR: ' + err);
});


var new_service_worker = 'service-worker-'+ hash +'.js';
fs.rename('www/build/main.css', 'www/build/' + new_main_css , function(err) {
    if ( err ) console.log('ERROR: ' + err);
});


var content = fs.readFileSync('www/index.html').toString();
content = content.replace('service-worker.js', new_service_worker);
content = content.replace('main.js', new_main_js);
content = content.replace('main.css', new_main_css);
fs.writeFileSync('www/index.html', content);

// console.log(content);


