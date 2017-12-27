import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';



import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularXapiModule } from '../angular-xapi/angular-xapi.module';


import { AppService } from './../providers/app.service';


import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';



//
// Pages
// -----------------------------------------------
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ScheduleEditPage } from '../pages/schedule-edit/schedule-edit';
// import { ForumPage } from '../pages/forum/forum';
import { SettingsPage } from '../pages/settings/settings';
import { PostPage } from '../pages/post/post';
import { PostCreateEditPage } from '../pages/post-create-edit/post-create-edit';
import { CommentEditPage } from '../components/comment-edit/comment-edit';

import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';

import { TeacherListPage } from '../pages/teacher-list/teacher-list';
import { ScheduleTablePage } from '../pages/schedule-table/schedule-table';


import { TeacherDayoffPage } from '../pages/teacher-dayoff/teacher-dayoff';
import { TeacherCurriculumVitaePage } from '../pages/teacher-curriculum-vitae/teacher-curriculum-vitae';

import { MessagePage } from '../pages/message/message';
import { EvaluatePage } from '../pages/evaluate/evaluate';
import { SettingsPaymentInfoPage } from '../pages/settings-payment-info/settings-payment-info';



import { PaymentPage } from '../pages/payment/payment';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { PolicyPage } from '../pages/policy/policy';
import { IntroComponent } from '../components/intro/intro';

import { PagePage } from '../pages/page/page';

import { SessionPastPage } from '../pages/session-past/session-past';
import { SessionFuturePage } from '../pages/session-future/session-future';

import { PasswordChangePage } from '../pages/password-change/password-change';





//
// Components
// -----------------------------
import { LoginBoxComponent } from '../components/login-box/login-box';
import { HeaderComponent } from '../components/header/header';
import { SitePreviewWidget} from '../components/site-preview/site-preview';
import { FileUploadWidget } from '../components/file-upload/file-upload';
import { FileDisplayWidget } from  '../components/file-display/file-display';
import { CommentCreateWidget } from '../pages/comment-create/comment-create';
import { CommentViewWidget } from '../components/comment-view/comment-view';
import { PostPopoverWidget } from '../components/post-popover/post-popover';
import { AddSchedule } from '../components/add-schedule/add-schedule';
import { PageComponent } from '../components/page/page';
import { EvaluateView } from '../components/evaluate-view/evaluate-view';
import { PaymentReceipt } from '../components/payment-receipt/payment-receipt';
import { HookContentBottomComponent } from '../components/hook-content-bottom/hook-content-bottom';
import { HookContentTopComponent } from '../components/hook-content-top/hook-content-top';
import { SessionList } from '../components/session-list/session-list';




// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScheduleEditPage,
    // ForumPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    MenuPage,
    LoginBoxComponent,
    HeaderComponent,
    PostPage,
    PostCreateEditPage,
    PostPopoverWidget,
    SitePreviewWidget,
    FileUploadWidget,
    FileDisplayWidget,
    CommentEditPage,
    CommentCreateWidget,
    CommentViewWidget,
    AddSchedule,
    TeacherListPage,
    ScheduleTablePage,
    TeacherDayoffPage,
    MessagePage,
    EvaluatePage,
    SettingsPaymentInfoPage,
    PaymentPage,
    PageComponent,
    PolicyPage,
    IntroComponent,
    TeacherCurriculumVitaePage,
    PaymentHistoryPage,
    EvaluateView,
    PaymentReceipt,
    HookContentBottomComponent,
    HookContentTopComponent,
    PagePage,
    SessionList,
    SessionPastPage,
    SessionFuturePage,
    PasswordChangePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, { tabsPlacement: 'top', tabs: '' }),
    AngularXapiModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScheduleEditPage,
    // ForumPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    MenuPage,
    PostPage,
    PostCreateEditPage,
    CommentEditPage,
    PostPopoverWidget,
    AddSchedule,
    TeacherListPage,
    ScheduleTablePage,
    TeacherDayoffPage,
    MessagePage,
    EvaluatePage,
    SettingsPaymentInfoPage,
    PaymentPage,
    PageComponent,
    PolicyPage,
    IntroComponent,
    TeacherCurriculumVitaePage,
    PaymentHistoryPage,
    EvaluateView,
    PaymentReceipt,
    HookContentBottomComponent,
    HookContentTopComponent,
    PagePage,
    SessionList,
    SessionPastPage,
    SessionFuturePage,
    PasswordChangePage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YoutubeVideoPlayer,
    AppService
  ]
})
export class AppModule {}
