import { Injectable } from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';

import { XapiService, UserService, ForumService } from './../angular-xapi/angular-xapi.module';
import * as I from "../angular-xapi/interfaces";

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
        public alertCtrl: AlertController,
        public user: UserService,
        public forum: ForumService,
        public xapi: XapiService
    ) {
        window['a'] = {
            open: this.open.bind( this ),
            alert: this.alert.bind( this )
        };

        xapi.setServerUrl('https://www.sonub.com');
        // xapi.setServerUrl('https://sonub.com:8443');
        // xapi.setServerUrl('http://sonub.com');
        xapi.version().subscribe(re => console.log("Xapi version: ", re));
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

    showAlert(title = '', content = '') {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: content,
        buttons: ['OK']
      });
      alert.present();
    }

    showError(err: I.ERROR_RESPONSE){
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Error' + err['code'],
        subTitle: err['message'],
        buttons: ['OK']
      });
      alert.present();
    }


    shortDate(stamp) {

      let d = new Date(stamp * 1000);
      let today = new Date();

      let dt = '';
      if (d.getFullYear() == today.getFullYear() && d.getMonth() == today.getMonth() && d.getDate() == today.getDate()) {
        dt = d.toLocaleString();
        dt = dt.substring(dt.indexOf(',') + 2).toLowerCase();
        dt = dt.replace(/\:\d\d /, ' ');
      }
      else {
        dt = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
      }
      return dt;
    }

}
