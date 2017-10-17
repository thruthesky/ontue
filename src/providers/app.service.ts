import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { XapiService, UserService, ForumService, LMSService } from './../angular-xapi/angular-xapi.module';
import {FileService} from "../angular-xapi/file.service";

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
        public alertCtrl: AlertController,
        public user: UserService,
        public forum: ForumService,
        public xapi: XapiService,
        public file: FileService,
        public lms: LMSService
    ) {

        /// for page service
        window['a'] = {
            open: this.open.bind(this),
            alert: this.alert.bind(this)
        };

        xapi.setServerUrl('https://www.sonub.com');
        xapi.setServerUrl('https://sonub.com:8443');
        // // xapi.setServerUrl('http://sonub.com');
        // // xapi.version().subscribe(re => console.log("Xapi version: ", re));
        console.log("login: ", user.isLogin);
        console.log("profile data: ", this.user.getProfile());


    }

    /**
     * Returns 'student' or 'teacher'.
     */
    get userType() {
        return this.lms.getUserType();
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

  postUserPhotoUrl(data) {
    if (data && data.author && data.author.photoURL) return data.author.photoURL;
    else return 'assets/img/student.png';
  }

  /**
   * Returns true if 'data' is mine.
   * @param data Post or Comment
   */
  my(data) {
    if (!this.user.id) return false;
    if (data && data['ID'] && data['post_author'] == this.user.id) return true;
    if (data && data['comment_ID'] && data['user_id'] == this.user.id) return true;
    return false;
  }

    /**
     * Displays an error message to user.
     *
     * @note it closes the 'loader' box. normally, 'loader' will be opened for http request.
     *
     * @param str error string or Error object.
     *
     * @code
     *      x.subscribe(re => re, e => this.a.alert( e )
     * @endcode
     */
    alert(str): void {
        console.log(str);
        if (str instanceof Error) {
            console.log("instanceof Error");
            str = this.xapi.getError(str).message;
        }
        else if (str instanceof HttpErrorResponse) {
            console.log("instanceof HttpErrorResponse");
            const e = str['error'];
            str = e['error']['message'] + "\n\n" + e['text'];
        }
        alert(str);
        this.hideLoaader(); // #
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

    showError(err) {
        console.log(err);
        let e = this.xapi.getError(err);
        let alert = this.alertCtrl.create({
            title: 'Error' + e['code'],
            subTitle: e['message'],
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
