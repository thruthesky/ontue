import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { XapiService, UserService, ForumService, LMSService } from './../angular-xapi/angular-xapi.module';
import { FileService } from "../angular-xapi/file.service";




@Injectable()
export class AppService {

    test = {
        register: false,
        login: false
    };

    loader;
    navCtrl: NavController = null;
    pages = {};
    pageName = 'home';

    anonymousPhotoURL = 'assets/img/anonymous.png';


    userData = {};

    i18n = {}; // This holds translated text from ngx-translation. Some texts needs to be loaded beforehand.


    inLoadingMyPoint = false;


    platform = null;
    constructor(
        public ngZone: NgZone,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public user: UserService,
        public forum: ForumService,
        public xapi: XapiService,
        public file: FileService,
        public lms: LMSService,
        private translate: TranslateService
    ) {

        /// for page service
        window['a'] = {
            open: this.open.bind(this),
            alert: this.alert.bind(this)
        };

        xapi.setServerUrl(window['url_backend']);
        // xapi.setServerUrl('https://www.sonub.com');
        // xapi.setServerUrl('https://sonub.com:8443');
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

    get isTeacher(): boolean {
        return this.lms.getUserType() === 'teacher';
    }

    get isStudent(): boolean {
        return this.lms.getUserType() === 'student';
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
    hideLoader() {
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

            this.pageName = page; /// set current page name.
            // alert('page: ' + page);
            page = this.pages[page];
            // console.log(page);
        }
        this.navCtrl.setRoot(page, params, {
            animate: true,
            direction: 'forward'
        }).then(() => {
            // alert(page);
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
     * Loads user point.
     * @note inLoadingMyPoint will be set true on loading.
     * @param callback callback
     */
    loadMyPoint(callback) {
        this.inLoadingMyPoint = true;
        this.lms.my_point().subscribe(re => {
            let point = re['point'];
            point = point.toString().split('').reverse().reduce((t, v, i, a) => {
                return t += v + (i < a.length - 1 && (i + 1) % 3 == 0 ? ',' : '');
            }, '').split('').reverse().join('');
            this.inLoadingMyPoint = false;
            callback(point);
        }, e => {
            this.inLoadingMyPoint = false;
            this.alert(e);
        });

    }

    /**
     * Displays an error message to user.
     *
     * @note it closes the 'loader' box. normally, 'loader' will be opened for http request.
     *
     * @param str
     *      It can be
     *          - a string.
     *          - an Error object of Javascripit 'Error' class
     *          - an object of { title: '...', subTitle: '...', message: '...', text: '...', callback: () => {} }
     *
     * @code
     *      x.subscribe(re => re, e => this.a.alert( e )
     *
            a.alert('Hello, Alert !');
            a.alert( { title: 'title', subTitle: 'subtitle', message: 'message', text: 'YES', callback: () => {
            console.log( this );
            } } );
            a.alert( new Error('This is an error alert') );

     * @endcode
     */
    alert(str): void {
        if (!str) {
            str = { title: 'No alert information was given.' };
        }
        console.log(str);
        if (typeof str === 'string') {
            str = { message: str };
        }
        else if (str instanceof Error) {
            console.log("instanceof Error");
            const message = this.xapi.getError(str).message;
            const code = this.xapi.getError(str).code;
            str = { subTitle: code, message: message };
        }
        else if (str instanceof HttpErrorResponse) {
            console.log("instanceof HttpErrorResponse");
            const HER = str;
            let title = 'HTTP_ERROR';
            let subTitle = '';
            let message = '';
            if (HER.message !== void 0) subTitle = HER.message;
            if (HER.error.message !== void 0) subTitle = HER.error.message;
            if (HER.error.text !== void 0) message = HER.error.text;

            if (HER.status == 0) {
                // subTitle = 'HTTP_ERROR_DESC';
                message = 'HTTP_ERROR_DESC';
            }

            console.log("i18n:", this.i18n);
            str = { title: this.i18n[title], subTitle: this.i18n[subTitle], message: this.i18n[message] };
            console.log('str: ', str);
        }
        else if (str['title'] !== void 0 || str['subTitle'] !== void 0 || str['message'] !== void 0) {

        }

        let options = {};
        if (str['title']) options['title'] = str['title'];
        if (str['subTitle']) options['subTitle'] = str['subTitle'];
        if (str['message']) options['message'] = str['message'];

        options['buttons'] = [{
            text: str['text'] === void 0 ? 'OK' : str['text'],
            handler: str['callback'] === void 0 ? null : str['callback']
        }];

        this.alertCtrl.create(options).present();

    }

    /**
     * This reports ( logs ) error message into backend.
     * @param msg Message to report to server.
     */
    reportServerError(msg) {

    }

    showAlert(title: any, content = '') {
        this.alert({ title: title, message: content });
    }

    showError(err) {
        let e = this.xapi.getError(err);
        this.showAlert('Error' + e['code'], e['message']);
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




    /**
     * Returns true if the app is running as Cordova mobile app.
     */
    get isCordova(): boolean {
        if (window['cordova']) return true;
        return false;
    }

    get isWeb(): boolean {
        if (document.URL.indexOf('http://') != -1
            || document.URL.indexOf('https://') != -1) return true;
        else return false;
    }



    render() {
        this.ngZone.run(() => { });
    }


    get(key: string) {
        return this.xapi.get(key);
    }
    set(key: string, value: any) {
        return this.xapi.set(key, value);
    }

    setLanguage(lang) {
        this.set('language', lang);
        this.initTranslate();
    }
    getLanguage() {
        return this.get('language');
    }



    initTranslate() {
        this.translate.setDefaultLang('en');

        // let lang;
        // lang = this.getLanguage();
        // if (!lang) lang = this.translate.getBrowserLang();
        // if (!lang) lang = 'en';

        this.translate.use(this.getUserLanguage());

        this.translate.get(['HTTP_ERROR', 'HTTP_ERROR_DESC']).subscribe(re => {
            this.i18n = re;
        });

    }

    /**
     * Returns user language in 'en' or 'ko'
     *
     * @use when you need to get user's language.
     * @warning `getLanguage()` returns only from localStroage while `getUserLanguage()` returns browser language IF localStorage has no value.
     */
    getUserLanguage() {
        let lang;
        lang = this.getLanguage();
        if (!lang) lang = this.translate.getBrowserLang();
        if (!lang) lang = 'en';
        return lang;
    }



    /**
     * Returns number from a string.
     * @param n number
     */
    toInt(n: any) {
        if (typeof n == 'string') {
            return parseInt(n);
        }
        else if (typeof n == 'number') {
            return n;
        }
        else {
            return 0;
        }
    }

    add0(n: number): string {
      if (!n) return;
      return n < 10 ? '0' + n : n.toString();
    }

    getYoutubeID(url) {
        if ( ! url ) return '';
        let arr = url.split('v=');
        if ( arr.length == 1 ) return '';
        let rest = arr[1].split('&');
        return rest[0];
    }
    /**
     * Returns url of embeded youtube.
     * @param ID Youtube video ID
     */
    getYoutubeUrl(ID) {
        let url = "https://www.youtube.com/embed/" + ID;
        url += "?autoplay=1&loop=1";
        return url;
    }

}
