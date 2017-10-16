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


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SchedulePage } from '../pages/schedule/schedule';
import { ForumPage } from '../pages/forum/forum';
import { MainPage } from '../pages/main/main';
import { SettingsPage } from '../pages/settings/settings';
import { PostPage } from '../pages/post/post';
import { PostCreateEditPage } from '../pages/post-create-edit/post-create-edit';



import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { MenuPage } from './../pages/menu/menu';


///
/// Components
/// -----------------------------
import { LoginBoxComponent } from './../components/login-box/login-box';
import { HeaderComponent } from './../components/header/header';
import { ChooseUserTypeComponent } from './../components/choose-user-type/choose-user-type';

import { SitePreviewWidget} from './../components/site-preview/site-preview';



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
    SitePreviewWidget
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
    PostCreateEditPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppService
  ]
})
export class AppModule {}
