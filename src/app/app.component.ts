import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

// import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { XapiService } from './../angular-xapi/angular-xapi-service.module';
import { AppService } from './../providers/app.service';
import { ShareService } from './../providers/share.service';







@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = MainPage;

  constructor(
    private translate: TranslateService, 
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    xapi: XapiService,
    public a: AppService,
    public s: ShareService
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

  ngAfterViewInit() {
    this.a.navCtrl = this.nav;
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
  

  onClickHome() {
    this.nav.setRoot( MainPage );
  }

  onClickLogin() {
    this.nav.push( this.s.pages.login.component );
  }
  onClickRegister() {
    this.nav.push( this.s.pages.register.component );
  }
}

