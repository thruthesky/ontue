import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



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
// import { ForumPage } from '../pages/forum/forum';
import { PostPage } from '../pages/post/post';

import { AddSchedule } from '../components/add-schedule/add-schedule';
import { TeacherListPage } from '../pages/teacher-list/teacher-list';
import { ScheduleTablePage } from '../pages/schedule-table/schedule-table';

import { TeacherDayoffPage } from '../pages/teacher-dayoff/teacher-dayoff';
import { TeacherCurriculumVitaePage } from '../pages/teacher-curriculum-vitae/teacher-curriculum-vitae';
import { MessagePage } from '../pages/message/message';

import { EvaluatePage } from '../pages/evaluate/evaluate';
import { EvaluateView } from '../components/evaluate-view/evaluate-view';

import { PaymentPage } from '../pages/payment/payment';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { PaymentReceipt } from '../components/payment-receipt/payment-receipt';


import { SessionPastPage } from '../pages/session-past/session-past';


import { PagePage } from '../pages/page/page';
import { SessionFuturePage } from "../pages/session-future/session-future";
import { PasswordChangePage } from "../pages/password-change/password-change";

import { ScheduleAvailablePage } from '../pages/schedule-available/schedule-available';
import { HelpPage } from '../pages/help/help';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    xapi: XapiService,
    public a: AppService
  ) {
    this.a.initTranslate();

    platform.ready().then(() => {
      this.a.platform = platform;
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  get rootPage() {
    // let noOfVisit = this.a.get('no-of-visit');
    // if ( noOfVisit < 3 ) {
    //   return IntroPage;
    // }
    // else
    return HomePage;
  };


  ngAfterViewInit() {
    this.a.navCtrl = this.nav;
    this.a.pages['home'] = HomePage;
    this.a.pages['menu'] = MenuPage;
    // this.a.pages['forum'] = ForumPage;
    this.a.pages['settings'] = SettingsPage;
    this.a.pages['schedule-edit'] = ScheduleEditPage;
    this.a.pages['login'] = LoginPage;
    this.a.pages['register'] = RegisterPage;

    this.a.pages['post'] = PostPage;

    this.a.pages['add-schedule'] = AddSchedule;
    this.a.pages['teacher-list'] = TeacherListPage;

    this.a.pages['schedule-table'] = ScheduleTablePage;

    this.a.pages['dayoff'] = TeacherDayoffPage;
    this.a.pages['message'] = MessagePage;

    this.a.pages['evaluate'] = EvaluatePage;
    this.a.pages['settings-payment-info'] = SettingsPaymentInfoPage;


    this.a.pages['payment'] = PaymentPage;
    this.a.pages['payment-history'] = PaymentHistoryPage;
    this.a.pages['policy'] = PolicyPage;

    // this.a.pages['intro'] = IntroPage;

    this.a.pages['teacher-curriculum-vitae'] = TeacherCurriculumVitaePage;

    this.a.pages['evaluate-view'] = EvaluateView;
    this.a.pages['payment-receipt'] = PaymentReceipt;


    this.a.pages['page'] = PagePage;

    this.a.pages['session-past'] = SessionPastPage;
    this.a.pages['session-future'] = SessionFuturePage;
    this.a.pages['password-change'] = PasswordChangePage;

    this.a.pages['schedule-available'] = ScheduleAvailablePage;

    this.a.pages['help'] = HelpPage;


    setTimeout(() => this.test(), 100);

  }

  test() {
    // this.a.open('home');
    // this.a.open('teacher-curriculum-vitae');
    // this.a.open('payment-history');

    // this.a.open('schedule-edit');

    // this.a.open('schedule-table');

    // this.a.open('schedule-table', { ID: 809 }); // one schedule
    // this.a.open('schedule-table', { ID: 969 }); // many schedule
    // this.a.open('schedule-table', { ID: 806 }); /// tabetha

    // this.a.open('teacher-list');

    // this.a.open('schedule-edit');

    // this.a.open('login');

    // this.a.open('register');
    // this.a.open('menu');

    // this.a.open('reservation', {past: true})

    // this.a.open('past');

    // this.a.open('dayoff');
    // this.a.open('message');

    // this.a.open('message');

    // this.a.open('evaluate', {idx: 1639} );
    // this.a.open('evaluate', {idx: 9707} );

    // this.a.open('evaluate-view', {idx: 9707} );


    // this.a.open('payment');
    // this.a.open('settings-payment-info');
    // this.a.open('settings-payment-info');

    // this.a.open('payment');

    // this.a.open('policy');
    // this.a.open('forum');


    // this.a.open('settings');



    // this.a.open('intro');

    // this.a.open('home');

    // this.a.open('session-past');
    // this.a.open('session-future');
    // this.a.open('password-change');


    this.a.open('schedule-available');

    // this.a.open('help');
    
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

