

var fs = require('fs');
var contents = fs.readFileSync('src/index.html').toString();


if ( contents.indexOf("// url_backend = 'https://www.ontue.com';") != -1 ) {
    console.log("WARNING\nPlease Enable Real Backend URL in index.html\n");
    process.exit(11);
}


if ( contents.indexOf("// if ('serviceWorker' in navigator) {") != -1 ) {
    console.log("WARNING:\nPlease Enable PWA code in index.html\n");
    process.exit(1);
}


if ( contents.indexOf('<!-- <script src="cordova.js"></script> -->') == -1 ) {
    console.log("WARNING:\nPlease comment out cordova script tag in index.html\n");
    process.exit(2);
}



var contents = fs.readFileSync('src/providers/app.service.ts').toString();

if ( contents.indexOf("// urlBackend = \"https://www.ontue.com\";") != -1 ) {
    console.log("WARNING\nPlease Enable Real Backend URL in index.html\n");
    process.exit(11);
}


var app_component = fs.readFileSync('src/app/app.component.ts').toString();


// if ( app_component.indexOf('// platform.ready().then(() => {') == -1 ) {
//     console.log("WARNING:\nPlease Comment Out platform..ready() in app.component.ts\n");
//     process.exit(2);
// }

if ( app_component.indexOf("// import { SplashScreen } from '@ionic-native/splash-screen';") == -1 ) {
    console.log("WARNING:\nPlease comment out SplashSreen in app.component.ts\n");
    process.exit(2);
}

var fs = require('fs');
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_component.indexOf("// import { StatusBar } from '@ionic-native/status-bar';") == -1 ) {
    console.log("WARNING:\nPlease comment out StatusBar in app.component.ts\n");
    process.exit(2);
}

var fs = require('fs');
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_module.indexOf("// import { SplashScreen } from '@ionic-native/splash-screen';") == -1 ) {
    console.log("WARNING:\nPlease comment out SplashSreen in app.module.ts\n");
    process.exit(2);
}

var fs = require('fs');
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_module.indexOf("// import { StatusBar } from '@ionic-native/status-bar';") == -1 ) {
    console.log("WARNING:\nPlease comment out StatusBar in app.module.ts\n");
    process.exit(2);
}



process.exit(0);
