import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// import { AngularXapiServiceModule } from '../angular-xapi/angular-xapi-service.module';
import { AppService } from './../providers/app.service';
import { ShareService } from './../providers/share.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SchedulePage } from '../pages/schedule/schedule';
import { ForumPage } from '../pages/forum/forum';
import { MainPage } from '../pages/main/main';
import { SettingsPage } from '../pages/settings/settings';


import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { MenuPage } from './../pages/menu/menu';




import { LoginBoxComponent } from './../components/login-box/login-box';
import { HeaderComponent } from './../components/header/header';


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
    HeaderComponent
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
    // AngularXapiServiceModule
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
    MenuPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppService,
    ShareService
  ]
})
export class AppModule { }
