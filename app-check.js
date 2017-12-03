

var fs = require('fs');
var contents = fs.readFileSync('src/index.html').toString();

if ( contents.indexOf("// if ('serviceWorker' in navigator) {") == -1 ) {
    console.log("WARNING:\nPlease uncomment pwa code in index.html\n");
    process.exit(1);
}

if ( contents.indexOf('<!-- <script src="cordova.js"></script> -->') == -1 ) {
    console.log("WARNING:\nPlease comment out cordova script tag in index.html\n");
    process.exit(2);
}


var fs = require('fs');
var app_component = fs.readFileSync('src/app/app.component.ts').toString();
if ( app_component.indexOf('// platform.ready().then(() => {') != -1 ) {
    console.log("WARNING:\nPlease comment out patform.ready() in app.component.ts\n");
    process.exit(2);
}

if ( app_component.indexOf("// import { SplashScreen } from '@ionic-native/splash-screen';") != -1 ) {
    console.log("WARNING:\nPlease Uncomment SplashSreen in app.component.ts\n");
    process.exit(2);
}

if ( app_component.indexOf("//   statusBar.styleDefault();") != -1 ) {
    console.log("WARNING:\nPlease Uncomment statusBar.styleDefault(); in app.component.ts\n");
    process.exit(2);
}
if ( app_component.indexOf("//   splashScreen.hide();") != -1 ) {
    console.log("WARNING:\nPlease Uncomment //   splashScreen.hide(); in app.component.ts\n");
    process.exit(2);
}





var fs = require('fs');
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_component.indexOf("// import { StatusBar } from '@ionic-native/status-bar';") != -1 ) {
    console.log("WARNING:\nPlease Uncomment StatusBar in app.component.ts\n");
    process.exit(2);
}



if ( app_module.indexOf("// import { SplashScreen } from '@ionic-native/splash-screen';") != -1 ) {
    console.log("WARNING:\nPlease Uncomment SplashSreen in app.module.ts\n");
    process.exit(2);
}


if ( app_module.indexOf("// import { StatusBar } from '@ionic-native/status-bar';") != -1 ) {
    console.log("WARNING:\nPlease Uncomment StatusBar in app.module.ts\n");
    process.exit(2);
}


var fs = require('fs');
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_module.indexOf("// StatusBar,") != -1 ) {
    console.log("WARNING:\nPlease Uncomment StatusBar in Providers in app.module.ts\n");
    process.exit(2);
}
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_module.indexOf("// SplashScreen,") != -1 ) {
    console.log("WARNING:\nPlease Uncomment SplashScreen in Providers in app.module.ts\n");
    process.exit(2);
}




    


process.exit(0);
