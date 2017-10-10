import { Injectable } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
// import { ShareService } from './share.service';
import { XapiService, UserService, ForumService } from './../angular-xapi/angular-xapi-service.module';

@Injectable()
export class AppService {

    test = {
        register: false,
        login: false
    };

    loader;
    navCtrl: NavController = null;
    pages = {};

    constructor(
        public loadingCtrl: LoadingController,
        // public s: ShareService,
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
    pop() {
        this.navCtrl.pop();
    }

    open( page: any ) {
        if ( typeof page === 'string' ) {
            if ( ! this.pages[ page ] ) return this.alert( 'Wrong page name: ' + page );
            page = this.pages[ page ];
        }
        this.navCtrl.setRoot( page );
    }

    alert( str ): void {
        alert( str );
        return;
    }
    
}
