import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { XapiService, UserService, ForumService, LMSService } from './../angular-xapi/angular-xapi.module';
import { FileService } from "../angular-xapi/file.service";

import { SHARE_SESSION_LIST } from './interface';
export { SHARE_SESSION_LIST };




@Injectable()
export class AppService {


    DEFAULT_DAYS_TO_SHOW_ON_PAST_PAGE = 90; // 90 days.


    test = {
        register: false,
        login: false
    };

    loader;
    navCtrl: NavController = null;
    pages = {};
    page = 'home'; // current page name. it changes on this.open()

    anonymousPhotoURL = 'assets/img/anonymous.png';


    userData = {};

    i18n = {}; // This holds translated text from ngx-translation. Some texts needs to be loaded beforehand.


    inLoadingMyPoint = false;


    platform = null;
    hostname = window.location.hostname;
    constructor(
        public ngZone: NgZone,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
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
        if ( this.user.isLogout ) return false;
        return this.lms.getUserType() === 'teacher';
    }

    get isStudent(): boolean {
        if ( this.user.isLogout ) return false;
        return this.lms.getUserType() === 'student';
    }


    showLoader() {
        console.log("Show loader");
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 30000,
            dismissOnPageChange: true,
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

            this.page = page; /// set current page name.
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
            point = this.number_format( point );
            this.inLoadingMyPoint = false;
            callback(point);
        }, e => {
            this.inLoadingMyPoint = false;
            this.alert(e);
        });
    }

    number_format( n ) {
        return n.toString().split('').reverse().reduce((t, v, i, a) => {
            return t += v + (i < a.length - 1 && (i + 1) % 3 == 0 ? ',' : '');
        }, '').split('').reverse().join('');
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
     *          - an object of { title: '...', message: '...' }
     *
     * @code
     *      x.subscribe(re => re, e => this.a.alert( e )
     *
            a.alert('Hello, Alert !');
            a.alert( { title: 'title', message: 'message' );
            a.alert( new Error('This is an error alert') );

     * @endcode
     */
    alert(str): void {
        if (! str ) {
            str = { message: 'No alert information was given.' };
        }

        if ( str.callback !== void 0 ) alert("Callback is not supported by 2018-0101");
        if ( str.text !== void 0 ) alert("text is not supported by 2018-0101");

        // console.log(str);

        let options = {
            duration: 15000,  // default 10000 due to unit testing temporary change to 15000
            showCloseButton: true,
            closeButtonText: this.i18n['CLOSE'],
            cssClass: 'alert-toast'
        };

        if ( typeof str === 'string' ) { // Mostly a message to user
            options['message'] = str;
        }
        else if ( str instanceof Error ) { // Mostly an error from backend.
            // console.log("instanceof Error");
            const message = this.xapi.getError(str).message;
            const code = this.xapi.getError(str).code;
            options['message'] = message;
            options['cssClass'] = 'error' + code;
        }
        else if ( str instanceof HttpErrorResponse ) { // backend wordpress response error. status may be 200.
            console.log("instanceof HttpErrorResponse");
            const HER = str;
            let title = 'HTTP_ERROR';
            let message = 'HTTP_ERROR_DESC';
            if ( HER.status == 200 ) {
                message = 'PHP_ERROR_DESC';
            }
            options['message'] = this.i18n[title] + ' ' + this.i18n[message];
        }
        else if ( str.title !== void 0 || str.message !== void 0 ) {
            options['message'] = str.title + " " + str.message;
        }
        else {
            options['message'] = 'No message';
        }

        console.log('options: ', options);

        this.toastCtrl.create(options).present();

    }

    /**
     * This reports ( logs ) error message into backend.
     * @param msg Message to report to server.
     */
    reportServerError(msg) {

    }

    showAlert(title: any, content = '') {
        console.log( title, content);
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

        this.translate.get([
            'HTTP_ERROR',
            'HTTP_ERROR_DESC',
            'PHP_ERROR_DESC',
            "SELECT_TEACHER_TITLE",
            "CLOSE",
            'CHOOSE USER TYPE',
            "NAME REQUIRED",
            'EMAIL REQUIRED',
            "PASSWORD REQUIRED",
            "PHONE NUMBER REQUIRED",
            "PHONE NUMBER",
            "KAKAOTALK ID",
            "KAKAOTALK ID REQUIRED"
            ]).subscribe(re => {
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
     *
     *
     */
    toInt(n: any) {
        try {
            return parseInt( n );
        }
        catch ( e ) {
            return 0;
        }
        // if (typeof n == 'string') {
        //     return parseInt(n);
        // }
        // else if (typeof n == 'number') {
        //     return n;
        // }
        // else {
        //     return 0;
        // }
    }

    toFloat( n ) {
        try {
            return parseFloat( n );
        }
        catch( e ) {
            return 0;
        }
    }

    add0(n: number): string {
        if (!n) return;
        return n < 10 ? '0' + n : n.toString();
    }

    getYoutubeID(url) {
        if (!url) return '';
        let arr = url.split('v=');
        if (arr.length == 1) return '';
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


    countStar(grade) {
        grade = parseInt(grade);
        if ( grade >= 5 ) grade = 5;
        let re = Array(grade).fill(true);
        return re;
    }

    countEmptyStar(grade) {
        grade = parseInt(grade);
        if ( grade >= 5 ) grade = 5;
        let re = Array(5 - grade).fill(true);
        return re;
    }


    /**
     * Return teacher name after sanitizing it.
     * @param name Teacher name
     */
    preTeacherName(name) {
        if (!name) return 'No Name';
        if (name.length > 8) name = name.substr(0, 8);
        return name;
    }


    /**
     * Return true if the app should display student theme.
     *
     * 1. if any one(even if the user is student) access ontue.com site, app will show teacher theme.
     * 2. domain is not ontue.com ( may be user is in other domain or using app )
     *      => depending on login user type, it returns true/false
     *      => Teacher may access 'localhost' or app. so, if a user logs in as a teacher, app must show teacher theme.
     * 3. domain is not ontue.com and user is not logged in
     *      => return true.
     */
    get studentTheme() {
        if ( this.hostname == "ontue.com" || this.hostname == 'www.ontue.com') return false;
        else if ( this.lms.getUserType() == "student" ) return true;
        else if ( this.lms.getUserType() == "teacher" ) return false;
        else return true;
    }
    get teacherTheme() {
        return ! this.studentTheme;
    }


}
