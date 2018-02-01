
var fs = require('fs');
var d = new Date();
var hash = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + '-' + d.getHours() +'-'+ d.getMinutes() +'-'+ d.getSeconds();
console.log('hash: ', hash);


var content = fs.readFileSync('www/service-worker.js').toString();
content = content.replace('main.js', 'main.js?version=' + hash);
content = content.replace('main.css', 'main.css?version=' + hash);
fs.writeFileSync('www/service-worker.js', content);



var content = fs.readFileSync('www/index.html').toString();
content = content.replace('service-worker.js', 'service-worker.js?version=' + hash);
content = content.replace('main.js', 'main.js?version=' + hash);
content = content.replace('main.css', 'main.css?version=' + hash);
content = content.replace('vendor.js', 'vendor.js?version=' + hash);
content = content.replace('polyfills.js', 'polyfills.js?version=' + hash);
content = content.replace('manifest.json', 'manifest.json?version=' + hash);


fs.writeFileSync('www/index.html', content);

// console.log(content);


