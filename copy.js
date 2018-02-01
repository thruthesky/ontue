var fs = require('fs-extra');
fs.copy('src/firebase-messaging-sw.js','www/firebase-messaging-sw.js');
fs.copy('src/manifest.json','www/manifest.json');
