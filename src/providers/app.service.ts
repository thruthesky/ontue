import { Injectable } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { XapiService, UserService, ForumService } from './../angular-xapi/angular-xapi.module';

@Injectable()
export class AppService {

    test = {
        register: false,
        login: false
    };

    loader;
    navCtrl: NavController = null;
    pages = {};




    userData = {};
    constructor(
        public loadingCtrl: LoadingController,
        public user: UserService,
        public forum: ForumService,
        public xapi: XapiService
    ) {

        /// for page service
        window['a'] = {
            open: this.open.bind( this ),
            alert: this.alert.bind( this )
        };
         

        //
        xapi.setServerUrl('http://sonub.com');
        // xapi.version().subscribe(re => console.log("Xapi version: ", re));
        console.log("login: ", user.isLogin);
        user.data().subscribe( re => this.userData = re );
    }

    get userType() {
        if ( this.userData['type'] ) {
            if ( this.userData['type'] == 'T' ) return 'teacher';
            else if ( this.userData['type'] == 'S' ) return 'student';
            else return '';
        }
        else return '';
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
        if (this.loader) this.loader.dismiss();
    }

    push(page) {
        this.navCtrl.push(page);
    }
    pop() {
        this.navCtrl.pop();
    }

    open(page: any, params?) {
        if (typeof page === 'string') {
            if (!this.pages[page]) return this.alert('Wrong page name: ' + page);
            page = this.pages[page];
        }
        this.navCtrl.setRoot(page, params, {
            animate: true,
            direction: 'forward'
          });
    }

    alert(str): void {
        alert(str);
        return;
    }

}
