import { Injectable } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { XapiService, UserService, ForumService } from './../angular-xapi/angular-xapi-service.module';

@Injectable()
export class AppService {

    test = {
        register: false,
        login: false
    };

    loader;
    navCtrl: NavController = null;

    constructor(
        public loadingCtrl: LoadingController,
        public user: UserService,
        public forum: ForumService,
        public xapi: XapiService
    ) {
        xapi.setServerUrl('https://www.sonub.com');
        console.log("login: ", user.isLogin);
    }

    
    showLoader() {
        console.log("Show loader");
        this.loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 30000,
          dismissOnPageChange: true
        });
        this.loader.present();
    }
    hideLoaader() {
        if ( this.loader ) this.loader.dismiss();
    }
    
    push( page ) {
        this.navCtrl.push( page );
    }

}
