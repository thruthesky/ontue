import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { XapiService } from './../angular-xapi/angular-xapi.module';
import { AppService } from './../providers/app.service';




// import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from './../pages/settings/settings';
import { SchedulePage } from './../pages/schedule/schedule';
import { MenuPage } from './../pages/menu/menu';
import { ForumPage } from './../pages/forum/forum';
import { PostPage } from './../pages/post/post';
import { TeacherProfilePage } from './../pages/teacher-profile/teacher-profile';
import { StudentProfilePage } from './../pages/student-profile/student-profile';










@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  constructor(
    private translate: TranslateService,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    xapi: XapiService,
    public a: AppService
  ) {
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
    this.a.pages['home'] = HomePage;
    this.a.pages['menu'] = MenuPage;
    this.a.pages['forum'] = ForumPage;
    this.a.pages['settings'] = SettingsPage;
    this.a.pages['schedule'] = SchedulePage;
    this.a.pages['login'] = LoginPage;
    this.a.pages['register'] = RegisterPage;

    this.a.pages['post'] = PostPage;
    this.a.pages['teacher-profile'] = TeacherProfilePage;
    this.a.pages['student-profile'] = StudentProfilePage;


    setTimeout(() => this.test(), 100);

  }

  test() {
    this.a.open('student-profile');
    // this.a.open('register');
  }



  initTranslate() {
    // Set the default language for translation strings, and the current language..
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
    this.a.open( HomePage );
  }

  onClickLogin() {
    this.a.open( LoginPage );
  }
  onClickRegister() {
    this.a.open( RegisterPage );
  }
}

