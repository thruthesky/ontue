import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

// 3rd Parties
// ------------------------------------------------

// Services
// -----------------------------------------------
import { AngularXapiModule } from '../angular-xapi/angular-xapi.module';
import { AppService } from './../providers/app.service';

//
// Pages
// -----------------------------------------------
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScheduleEditPage } from '../pages/schedule-edit/schedule-edit';
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
import { PaymentResultPage } from '../pages/payment-result/payment-result';
import { PaymentHistoryPage } from '../pages/payment-history/payment-history';
import { IntroComponent } from '../components/intro/intro';
import { PagePage } from '../pages/page/page';
import { SessionPastPage } from '../pages/session-past/session-past';
import { SessionFuturePage } from '../pages/session-future/session-future';
import { PasswordChangePage } from '../pages/password-change/password-change';
import { ScheduleAvailablePage } from '../pages/schedule-available/schedule-available';
import { HelpPage } from '../pages/help/help';
import { ClassCommentPage } from '../pages/class-comment/class-comment';
import { TeacherDashboardPage } from '../pages/teacher-dashboard/teacher-dashboard';
import { HowToUsePage } from '../pages/how-to-use/how-to-use';
import { MyPointPage } from '../pages/my-point/my-point';
import { StudentRegisterSuccessPage } from '../pages/student-register-success/student-register-success';
import { StudentAdvPage } from '../pages/student-adv/student-adv';
import { StudentCurriculumnPage } from '../pages/student-curriculumn/student-curriculumn';
import { SalaryComputationPage } from '../pages/salary-computation/salary-computation';







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
import { MessageWrite } from '../components/message-write/message-write';
import { CurriculumVitaeView } from '../components/curriculum-vitae-view/curriculum-vitae-view';
import { RefundRequestView } from '../components/refund-request-view/refund-request-view';

import { StudentCommentList } from '../components/student-comment-list/student-comment-list';
import { StudentCommentEdit } from '../components/student-comment-edit/student-comment-edit';

import { HomeStudentBannerComponent } from '../components/home-student-banner/home-student-banner';

import { HomeStudentContentComponent } from '../components/home-student-content/home-student-content';

import { HomeTeacherContentComponent } from '../components/home-teacher-content/home-teacher-content';

import { HowToInstallKakaoMobileComponent } from '../components/how-to-install-kakao-mobile/how-to-install-kakao-mobile';
import { HowToInstallKakaoDesktopComponent } from '../components/how-to-install-kakao-desktop/how-to-install-kakao-desktop';
import { HowToGetQRCodeComponent } from '../components/how-to-get-qrcode/how-to-get-qrcode';
import { HowToGetKakaoIDComponent } from '../components/how-to-get-kakao-id/how-to-get-kakao-id';
import { HowToRegisterComponent } from '../components/how-to-register/how-to-register';
import { TeacherPolicyComponent } from '../components/teacher-policy/teacher-policy';
import { TeacherHeaderComponent } from '../components/teacher-header/teacher-header';
import { PageNavigatorComponent } from '../components/page-navigator/page-navigator';
import { TeacherRemindersComponent } from '../components/teacher-reminders/teacher-reminders';
import { TeacherGradingSystemComponent } from '../components/teacher-grading-system/teacher-grading-system';
import { TeacherGuidelinesComponent } from '../components/teacher-guidelines/teacher-guidelines';
import { GradedTeachersComponent } from '../components/graded-teachers/graded-teachers';
import { TeacherStatisticsComponent } from '../components/teacher-statistics/teacher-statistics';
import { TeacherStudentCommentComponent } from '../components/teacher-student-comment-component/teacher-student-comment';
import { TeacherReservationsComponent } from '../components/teacher-reservations/teacher-reservations';
import { TeacherEvaluationsComponent } from '../components/teacher-evaluations/teacher-evaluations';
import { TeacherStepComponent } from '../components/teacher-steps/teacher-steps';
import { TeacherActivityLogComponent } from '../components/teacher-activity-log/teacher-activity-log';
import { TeacherGradeComponent } from '../components/teacher-grade/teacher-grade';
import { TeacherLeveltestComponent } from '../components/teacher-leveltest/teacher-leveltest';





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
    PasswordChangePage,
    ScheduleAvailablePage,
    HelpPage,
    MessageWrite,
    CurriculumVitaeView,
    RefundRequestView,
    StudentCommentList,
    StudentCommentEdit,
    ClassCommentPage,
    HomeStudentBannerComponent,
    TeacherDashboardPage,
    HomeStudentContentComponent,
    HomeTeacherContentComponent,
    PaymentResultPage,
    HowToUsePage,
    HowToInstallKakaoMobileComponent,
    HowToInstallKakaoDesktopComponent,
    HowToGetQRCodeComponent,
    HowToGetKakaoIDComponent,
    MyPointPage,
    TeacherPolicyComponent,
    HowToRegisterComponent,
    TeacherHeaderComponent,
    StudentRegisterSuccessPage,
    PageNavigatorComponent,
    StudentAdvPage,
    TeacherRemindersComponent,
    TeacherGradingSystemComponent,
    TeacherGuidelinesComponent,
    GradedTeachersComponent,
    TeacherStatisticsComponent,
    TeacherStudentCommentComponent,
    TeacherReservationsComponent,
    TeacherEvaluationsComponent,
    TeacherStepComponent,
    TeacherActivityLogComponent,
    TeacherGradeComponent,
    StudentCurriculumnPage,
    TeacherLeveltestComponent,
    SalaryComputationPage
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
    PasswordChangePage,
    ScheduleAvailablePage,
    HelpPage,
    MessageWrite,
    CurriculumVitaeView,
    RefundRequestView,
    StudentCommentList,
    StudentCommentEdit,
    ClassCommentPage,
    HomeStudentBannerComponent,
    TeacherDashboardPage,
    PaymentResultPage,
    HowToUsePage,
    HowToInstallKakaoMobileComponent,
    HowToInstallKakaoDesktopComponent,
    HowToGetQRCodeComponent,
    HowToGetKakaoIDComponent,
    MyPointPage,
    TeacherPolicyComponent,
    HowToRegisterComponent,
    TeacherHeaderComponent,
    StudentRegisterSuccessPage,
    PageNavigatorComponent,
    StudentAdvPage,
    TeacherRemindersComponent,
    TeacherGradingSystemComponent,
    TeacherGuidelinesComponent,
    GradedTeachersComponent,
    TeacherStatisticsComponent,
    TeacherStudentCommentComponent,
    TeacherReservationsComponent,
    TeacherEvaluationsComponent,
    TeacherStepComponent,
    TeacherActivityLogComponent,
    TeacherGradeComponent,
    StudentCurriculumnPage,
    TeacherLeveltestComponent,
    SalaryComputationPage
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    YoutubeVideoPlayer,
    AppService
  ]
})
export class AppModule {}
