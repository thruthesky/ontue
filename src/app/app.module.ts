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


//
// Pages
// -----------------------------------------------
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SchedulePage } from '../pages/schedule/schedule';
import { ForumPage } from '../pages/forum/forum';
import { MainPage } from '../pages/main/main';
import { SettingsPage } from '../pages/settings/settings';
import { PostPage } from '../pages/post/post';
import { PostCreateEditPage } from '../pages/post-create-edit/post-create-edit';
import { CommentEditPage } from '../components/comment-edit/comment-edit';

import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { MenuPage } from './../pages/menu/menu';
import { TeacherProfilePage } from './../pages/teacher-profile/teacher-profile';
import { StudentProfilePage } from './../pages/student-profile/student-profile';



//
// Components
// -----------------------------
import { LoginBoxComponent } from './../components/login-box/login-box';
import { HeaderComponent } from './../components/header/header';
import { ChooseUserTypeComponent } from './../components/choose-user-type/choose-user-type';
import { ChooseUserTypeModal } from './../components/choose-user-type-modal/choose-user-type-modal';
import { SitePreviewWidget} from './../components/site-preview/site-preview';
import { FileUploadWidget } from './../components/file-upload/file-upload';
import { FileDisplayWidget } from  './../components/file-display/file-display';
import { CommentCreateWidget } from './../pages/comment-create/comment-create';
import { CommentViewWidget } from './../components/comment-view/comment-view';
import { PostPopoverWidget } from '../components/post-popover/post-popover';



// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SchedulePage,
    ForumPage,
    MainPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    MenuPage,
    LoginBoxComponent,
    HeaderComponent,
    PostPage,
    ChooseUserTypeComponent,
    PostCreateEditPage,
    PostPopoverWidget,
    SitePreviewWidget,
    FileUploadWidget,
    FileDisplayWidget,
    CommentEditPage,
    CommentCreateWidget,
    CommentViewWidget,
    TeacherProfilePage,
    StudentProfilePage,
    ChooseUserTypeModal
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
    SchedulePage,
    ForumPage,
    MainPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
    MenuPage,
    PostPage,
    PostCreateEditPage,
    CommentEditPage,
    TeacherProfilePage,
    StudentProfilePage,
    ChooseUserTypeModal,
    PostPopoverWidget
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppService
  ]
})
export class AppModule {}
