import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


import { XapiService } from './../angular-xapi/angular-xapi.module';
import { AppService } from './../providers/app.service';
import { SettingsPaymentInfoPage } from '../pages/settings-payment-info/settings-payment-info';

import { PolicyPage } from '../pages/policy/policy';




// import { MainPage } from '../pages/main/main';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { ScheduleEditPage } from '../pages/schedule-edit/schedule-edit';
import { MenuPage } from '../pages/menu/menu';
import { ForumPage } from '../pages/forum/forum';
import { PostPage } from '../pages/post/post';

import { AddSchedule } from '../components/add-schedule/add-schedule';
import { TeacherListPage } from '../pages/teacher-list/teacher-list';
import { ScheduleTablePage } from '../pages/schedule-table/schedule-table';
import { ReservationPage } from '../pages/reservation/reservation';

import { TeacherDayoffPage } from '../pages/teacher-dayoff/teacher-dayoff';
import { TeacherCurriculumVitaePage } from '../pages/teacher-curriculum-vitae/teacher-curriculum-vitae';
import { TeacherListVideoPage } from '../pages/teacher-list-video/teacher-list-video';
import { MessagePage } from '../pages/message/message';

import { EvaluatePage } from '../pages/evaluate/evaluate';
import { PaymentPage } from '../pages/payment/payment';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';

import { IntroPage } from '../pages/intro/intro';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  constructor(
    platform: Platform,
    // statusBar: StatusBar,
    // splashScreen: SplashScreen,
    xapi: XapiService,
    public a: AppService,
    private youtube: YoutubeVideoPlayer
  ) {
    this.a.initTranslate();

    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    //
    //   this.a.platform = platform;
    //
    //   this.youtube.openVideo('VbdfKmgpqjc');
    //
    //
    //   // alert("I am on cordova!");
    // });

  }

  get rootPage() {
    let noOfVisit = this.a.get('no-of-visit');
    if ( noOfVisit < 3 ) {
      return IntroPage;
    }
    else return HomePage;
  };


  ngAfterViewInit() {
    this.a.navCtrl = this.nav;
    this.a.pages['home'] = HomePage;
    this.a.pages['menu'] = MenuPage;
    this.a.pages['forum'] = ForumPage;
    this.a.pages['settings'] = SettingsPage;
    this.a.pages['schedule-edit'] = ScheduleEditPage;
    this.a.pages['login'] = LoginPage;
    this.a.pages['register'] = RegisterPage;

    this.a.pages['post'] = PostPage;

    this.a.pages['add-schedule'] = AddSchedule;
    this.a.pages['teacher-list'] = TeacherListPage;

    this.a.pages['schedule-table'] = ScheduleTablePage;

    this.a.pages['reservation'] = ReservationPage;

    this.a.pages['dayoff'] = TeacherDayoffPage;
    this.a.pages['message'] = MessagePage;

    this.a.pages['evaluate'] = EvaluatePage;
    this.a.pages['settings-payment-info'] = SettingsPaymentInfoPage;


    this.a.pages['payment'] = PaymentPage;
    this.a.pages['payment-history'] = PaymentHistoryPage;
    this.a.pages['policy'] = PolicyPage;

    this.a.pages['intro'] = IntroPage;

    this.a.pages['teacher-curriculum-vitae'] = TeacherCurriculumVitaePage;
    this.a.pages['teacher-list-video'] = TeacherListVideoPage;


    setTimeout(() => this.test(), 100);

  }

  test() {
    // this.a.open('home');
    // this.a.open('teacher-curriculum-vitae');
    // this.a.open('teacher-list-video');
    // this.a.open('payment-history');

    // this.a.open('schedule-edit');

    // this.a.open('schedule-table', { ID: 806 });

    // this.a.open('teacher-list');

    // this.a.open('schedule-edit');

    // this.a.open('register');

    // this.a.open('register');
    // this.a.open('menu');

    // this.a.open('reservation', { past: true });

    // this.a.open('past');

    // this.a.open('dayoff');
    // this.a.open('message');

    // this.a.open('message');

    // this.a.open('evaluate', {idx: 1639} );
    // this.a.open('evaluate', {idx: 9707} );


    // this.a.open('settings-payment-info');
    // this.a.open('settings-payment-info');

    // this.a.open('payment');

    // this.a.open('policy');
    // this.a.open('forum');


    // this.a.open('settings');



    // this.a.open('intro');

    // this.a.open('home');


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

