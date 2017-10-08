import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { XapiService } from './../angular-xapi/angular-xapi-service.module';
import { ShareService } from './../providers/share.service';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    private translate: TranslateService, 
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    xapi: XapiService,
    share: ShareService
  ) {
    xapi.setServerUrl('https://www.sonub.com');
      this.initTranslate();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }
    this.translate.get(['BACK']).subscribe(values => {
      console.log(values.BACK);
    });
  }
  
}

