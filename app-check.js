

var fs = require('fs');
var contents = fs.readFileSync('src/index.html').toString();

if ( contents.indexOf("// if ('serviceWorker' in navigator) {") == -1 ) {
    console.log("WARNING:\nPlease Disable pwa code in index.html\n");
    process.exit(1);
}

if ( contents.indexOf('<!-- <script src="cordova.js"></script> -->') != -1 ) {
    console.log("WARNING:\nPlease Enable cordova script tag in index.html\n");
    process.exit(2);
}


var fs = require('fs');
var app_component = fs.readFileSync('src/app/app.component.ts').toString();
if ( app_component.indexOf('// platform.ready().then(() => {') != -1 ) {
    console.log("WARNING:\nPlease Enable patform.ready() in app.component.ts\n");
    process.exit(2);
}

if ( app_component.indexOf("// import { SplashScreen } from '@ionic-native/splash-screen';") != -1 ) {
    console.log("WARNING:\nPlease Eanble SplashSreen in app.component.ts\n");
    process.exit(2);
}

if ( app_component.indexOf("//   statusBar.styleDefault();") != -1 ) {
    console.log("WARNING:\nPlease Eanble statusBar.styleDefault(); in app.component.ts\n");
    process.exit(2);
}
if ( app_component.indexOf("//   splashScreen.hide();") != -1 ) {
    console.log("WARNING:\nPlease Eanble //   splashScreen.hide(); in app.component.ts\n");
    process.exit(2);
}





var fs = require('fs');
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_component.indexOf("// import { StatusBar } from '@ionic-native/status-bar';") != -1 ) {
    console.log("WARNING:\nPlease Eanble StatusBar in app.component.ts\n");
    process.exit(2);
}



if ( app_module.indexOf("// import { SplashScreen } from '@ionic-native/splash-screen';") != -1 ) {
    console.log("WARNING:\nPlease Eanble SplashSreen in app.module.ts\n");
    process.exit(2);
}


if ( app_module.indexOf("// import { StatusBar } from '@ionic-native/status-bar';") != -1 ) {
    console.log("WARNING:\nPlease Eanble StatusBar in app.module.ts\n");
    process.exit(2);
}


var fs = require('fs');
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_module.indexOf("// StatusBar,") != -1 ) {
    console.log("WARNING:\nPlease Eanble StatusBar in Providers in app.module.ts\n");
    process.exit(2);
}
var app_module = fs.readFileSync('src/app/app.module.ts').toString();
if ( app_module.indexOf("// SplashScreen,") != -1 ) {
    console.log("WARNING:\nPlease Eanble SplashScreen in Providers in app.module.ts\n");
    process.exit(2);
}




    


process.exit(0);
