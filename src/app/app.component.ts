import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


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
import { AddSchedule } from './../components/add-schedule/add-schedule';
import { TeacherListPage } from './../pages/teacher-list/teacher-list';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  constructor(
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    xapi: XapiService,
    public a: AppService
  ) {
      this.a.initTranslate();

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

    this.a.pages['add-schedule'] = AddSchedule;
    this.a.pages['teacher-list'] = TeacherListPage;




    setTimeout(() => this.test(), 100);

  }

  test() {

    // this.a.open('schedule');

    // this.a.open('register');



    // this.a.open('student-profile');
    // this.a.open('register');
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

