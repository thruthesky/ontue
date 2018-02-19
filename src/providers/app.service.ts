import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { XapiService, UserService, ForumService, LMSService } from './../angular-xapi/angular-xapi.module';
import { FileService } from "../angular-xapi/file.service";

import { SHARE_SESSION_LIST } from './interface';
export { SHARE_SESSION_LIST };


declare let FCMPlugin;

const KEY_LMS_INFO = 'lms-info';


import * as firebase from "firebase";
import "firebase/firestore"; // required for side-effect??? @see https://firebase.google.com/docs/firestore/quickstart?authuser=0
import { firestore } from 'firebase';


const firestoreLogCollection = 'user-activity-log-2';
const firebaseConfig = {
    apiKey: "AIzaSyCF9jsyLjQEDi4963DpOYi2wV0j19XSM2Q",
    authDomain: "ontue-30fb9.firebaseapp.com",
    databaseURL: "https://ontue-30fb9.firebaseio.com",
    projectId: "ontue-30fb9",
    storageBucket: "",
    messagingSenderId: "1068647439857"
};
firebase.initializeApp(firebaseConfig);



@Injectable()
export class AppService {
    countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];


    // urlBackend = "https://sonub.com:8443";
    urlBackend = "https://www.ontue.com";


    NO_SCHEDULE_PER_PAGE = 50;
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

    /**
     * LMS information from backend.
     * @note this is being called once very boot.
     * @attention this must be the only variable to be used to display LMS information.
     */
    info = null;

    student_kakaoplus_url = "http://pf.kakao.com/_eIxgAC";
    student_kakaoplus_deeplink = "kakaoplus://plusfriend/home/@katalkenglish";

    teacher_kakaoplus_url = "http://pf.kakao.com/_RcxbRC";
    teacher_kakaoplus_deeplink = "kakaoplus://plusfriend/home/@ontue"; // ; //

    thisYear = (new Date).getFullYear();

    userTime = '';

    /// Firebase
    firebase: {
        db: firebase.firestore.Firestore;
        messaging: firebase.messaging.Messaging;
    } = { db: null, messaging: null };

    /// push token
    pushToken: string = null;


    activity_log = [];

    /// EO Firebase
    constructor(
        public ngZone: NgZone,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public user: UserService,
        public forum: ForumService,
        public xapi: XapiService,
        public file: FileService,
        public lms: LMSService,
        public translate: TranslateService,
        public alertCtrl: AlertController
    ) {

        this.firebase.db = firebase.firestore();
        this.firebase.messaging = firebase.messaging();


        /// for page service
        window['a'] = {
            open: this.open.bind(this),
            alert: this.alert.bind(this)
        };

        xapi.setServerUrl(this.urlBackend);
        // xapi.setServerUrl('https://www.sonub.com');
        // xapi.setServerUrl('https://sonub.com:8443');
        // // xapi.setServerUrl('http://sonub.com');
        // // xapi.version().subscribe(re => console.log("Xapi version: ", re));
        // console.log("login: ", user.isLogin);
        // console.log("profile data: ", this.user.getProfile());



        // Just in case the app may need sometime to init.
        // Try to connect to the server first before it display the first page.
        setTimeout(() => {
            this.updateLMSInfo();
            if (this.user.isLogin) {
                this.log({ idx_user: this.user.id, name: this.user.name, activity: 'visit' });
            }
        }, 500);


        if (this.teacherTheme) {
            document.title = "OnTue.COM";
        }
        this.listenActivityLog();


        setInterval(() => this.updateUserTimezone(), 2000);
    }




    /**
     * 
     *      Gets LMS information from backend and saves into localStorage.
     * 
     *      And initialize LMS information.
     *  
     *          - Runs timer for local timzeone.
     * 
     * 
     * @note to get LMS information after loading from backend, use
     *      - this.lmsInfoUserNoOfTotalSessions
     *      - this.lmsInfoUserNoOfReservation
     *      - this.lmsInfoUserNoOfTotalPast
     *      - this.lmsInfo('SELLER_RATE')
     *
     * @param callback - You can use callback to get the result data from backend.
     *
     * @attention use this method to get user information. Once this method is being used, the app gets NOT only the user information BUT also it saves into localStorage.
     *
     * @note if you only want to get user point, consider using "loadMyPoint()". It's more convinent to only get point.
     */
    updateLMSInfo(callback = null) {
        this.info = this.get(KEY_LMS_INFO);
        if (!this.info) this.info = {};
        // console.log("info from cache: ", this.info);
        this.lms.info().subscribe(re => {
            console.log("re: ", re);
            this.set(KEY_LMS_INFO, re);
            this.info = this.get(KEY_LMS_INFO);

            // console.log( "lms info: ", this.info );
            // If student is accessing the site.
            if (this.info['user'] !== void 0) {
                if (this.info['user']['no_of_total_sessions'] !== void 0) this.updateLmsInfoUserNoOfTotalSessions(this.info['user']['no_of_total_sessions']);
                if (this.info['user']['no_of_reservation'] !== void 0) this.updateLmsInfoUserNoOfReservation(this.info['user']['no_of_reservation']);
                if (this.info['user']['no_of_past'] !== void 0) this.updateLmsInfoUserNoOfPast(this.info['user']['no_of_past']);

            }

            if (callback) callback(re);




            // console.log("updated info from remote: ", this.info);

        }, e => {
            //
        });
    }

    lmsInfoCancellableMinutes() {
        if (this.info && this.info['MAX_CANCELLABLE_TIME']) {
            return parseInt(this.info['MAX_CANCELLABLE_TIME']) / 60;
        }
        else return 0;
    }

    /**
     * Saves number of total sessions into localStorage
     * User this.lmsInfoUserNoOfTotalSessions to get the number.
     * @param count number of total sessions
     */
    updateLmsInfoUserNoOfTotalSessions(count) {
        this.set('no_of_total_sessions', count);
    }
    updateLmsInfoUserNoOfReservation(count) {
        this.set('no_of_reservation', count);
    }
    updateLmsInfoUserNoOfPast(count) {
        this.set('no_of_past', count);
    }



    /**
     * Returns total number of sessions of the login user.
     * it includes past and future.
     */
    get lmsInfoUserNoOfTotalSessions(): number {
        let count = this.get('no_of_total_sessions');
        if (!count) return 0;
        return parseInt(count);
    }
    /**
     * Returns number of past sessions.
     */
    get lmsInfoUserNoOfPast(): number {
        let count = this.get('no_of_past');
        if (!count) return 0;
        return parseInt(count);
    }
    /**
     * Returns number of reservarions.
     */
    get lmsInfoUserNoOfReservation(): number {
        let count = this.get('no_of_reservation');
        if (!count) return 0;
        return parseInt(count);
    }





    /**
     * If the student has less than or equal to 2 sessions, then we consider the student is new.
     */
    get newUser(): boolean {
        return this.lmsInfoUserNoOfTotalSessions <= 2;
    }
    /**
     * Returns 'student' or 'teacher'.
     */
    get userType() {
        return this.lms.getUserType();
    }

    get isTeacher(): boolean {
        if (this.user.isLogout) return false;
        return this.lms.getUserType() === 'teacher';
    }

    get isStudent(): boolean {
        if (this.user.isLogout) return false;
        return this.lms.getUserType() !== 'teacher';
    }


    showLoader() {
        // console.log("Show loader");
        this.loader = this.loadingCtrl.create({
            content: this.i18n['PLEASE WAIT'],
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
            point = this.number_format(point);
            this.inLoadingMyPoint = false;
            callback(point);
            this.render();
        }, e => {
            this.inLoadingMyPoint = false;
            this.alert(e);
        });
    }

    number_format(n) {
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
        if (!str) {
            str = { message: 'No alert information was given.' };
        }

        if (str.callback !== void 0) alert("Callback is not supported by 2018-0101");
        if (str.text !== void 0) alert("text is not supported by 2018-0101");

        // console.log(str);

        let options = {
            duration: 10000,  // default 10000 due to unit testing temporary change to 15000
            showCloseButton: true,
            closeButtonText: this.i18n['CLOSE'],
            cssClass: 'alert-toast'
            // dismissOnPageChange: true
        };

        if (str['duration'] !== void 0) options['duration'] = str['duration'];

        if (typeof str === 'string') { // Mostly a message to user
            options['message'] = str;
        }
        else if (str instanceof Error) { // Mostly an error from backend.
            // console.log("instanceof Error");
            const message = this.xapi.getError(str).message;
            const code = this.xapi.getError(str).code;
            options['message'] = message;
            options['cssClass'] = 'error' + code;
        }
        else if (str instanceof HttpErrorResponse) { // backend wordpress response error. status may be 200.
            // console.log("instanceof HttpErrorResponse");
            const HER = str;
            let title = 'HTTP_ERROR';
            let message = 'HTTP_ERROR_DESC';
            if (HER.status == 200) {
                message = 'PHP_ERROR_DESC';
            }
            options['message'] = this.i18n[title] + ' ' + this.i18n[message];
        }
        else if (str.title !== void 0 || str.message !== void 0) {
            if (str.title === void 0) str.title = '';
            options['message'] = str.title + " " + str.message;
        }
        else {
            options['message'] = 'No message';
        }

        // console.log('options: ', options);

        this.toastCtrl.create(options).present();

    }


    /**
     * Show an alert.
     *
     * @param title title
     * @param message subTitle
     * @param callback callback
     *
     * @code
     *
     *       this.a.okDialog( '즉시 수업', '<div class="my-3">지금 곧 시작하는 수업을 예약 하였습니다.</div>수업 예약 페이지로 이동을 합니다.', () => alert('go') );
     *
     * @endcode
     */
    okDialog(title, message, callback = null) {

        let close = { text: this.i18n['CONFIRM'] };
        if (callback) close['handler'] = () => callback();
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [close],
            enableBackdropDismiss: false
        });

        alert.present();
    }

    /**
     * This reports ( logs ) error message into backend.
     * @param msg Message to report to server.
     */
    reportServerError(msg) {

    }

    showAlert(title: any, content = '') {
        // console.log(title, content);
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
            dt = d.getFullYear().toString().substr(2, 2) + '-' + d.getMonth() + '-' + d.getDate();
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



    render(timeout = 10) {
        setTimeout(() => {
            this.ngZone.run(() => { });
        }, timeout);
    }


    /**
     * Get the value of the key from localStorage
     * @param key key of localStorage
     * @return it can be an object or a scalar.
     */
    get(key: string): any {
        return this.xapi.get(key);
    }
    /**
     * Saves value into localStorage
     * @param key key of localStorage
     * @param value value to save. it can be an object or a scalar.
     */
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
            "CONFIRM",
            'CHOOSE USER TYPE',
            "NAME REQUIRED",
            'EMAIL REQUIRED',
            "PASSWORD REQUIRED",
            "PHONE NUMBER REQUIRED",
            "PHONE NUMBER",
            "KAKAOTALK ID",
            "KAKAOTALK ID REQUIRED",
            "CHOOSE DIFFERENT HOURS",
            // "LOADING SCHEDULE",
            // "GOT SCHEDULE",
            // "DISPLAYING SCHEDULE",
            // "SCHEDULE DISPLAYED"
            "STUDENT COMMENTS",
            'PLEASE WAIT',
            'UPDATED',
            'REGISTERED'
        ]).subscribe(re => {
            // console.log("i81n: ", re);
            this.i18n = re;
        }, () => { });

    }

    /**
     * Returns user language in 'en' or 'ko'
     *
     * @attention This is the only method you can use to get user's language.
     * @warning `getLanguage()` returns only from localStroage while `getUserLanguage()` returns browser language IF localStorage has no value.
     */
    getUserLanguage() {
        let lang;
        lang = this.getLanguage();
        if (!lang) lang = this.translate.getBrowserLang();
        if (!lang) lang = 'en';
        return lang;
    }
    get language(): 'en' | 'ko' {
        return this.getUserLanguage();
    }
    get isKorean(): boolean {
        return this.language == 'ko';
    }



    /**
     * Returns number from a string.
     * @param n number
     *
     *
     */
    toInt(n: any) {
        try {
            return parseInt(n);
        }
        catch (e) {
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

    toFloat(n) {
        try {
            return parseFloat(n);
        }
        catch (e) {
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
        if (grade >= 5) grade = 5;
        let re = Array(grade).fill(true);
        return re;
    }

    countEmptyStar(grade) {
        grade = parseInt(grade);
        if (grade >= 5) grade = 5;
        let re = Array(5 - grade).fill(true);
        return re;
    }


    /**
     * Return teacher name after sanitizing it.
     * @param name Teacher name
     * @param length Number of maximum name length
     */
    preTeacherName(name, length = 8) {
        if (!name) return 'No Name';
        if (name.length > length) name = name.substr(0, length);
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


        // COMMENT OUT FOR REAL CASE
        if ( this.NO_SCHEDULE_PER_PAGE ) return false;  // show teacher theme. test


        /////  UNCOMMENT BELOW FOR REAL CASE
        if (this.hostname == "ontue.com" || this.hostname == 'www.ontue.com') return false;
        else if (this.lms.getUserType() == "student") return true;
        else if (this.lms.getUserType() == "teacher") return false;
        else return true;
    }
    get teacherTheme() {
        return !this.studentTheme;
    }


    onClickContactAdmin() {
        if (this.teacherTheme) {
            if (this.isMobileWeb()) window.open(this.teacher_kakaoplus_deeplink);
            else if (this.isMobile()) window.open(this.teacher_kakaoplus_url);
            else this.alert("Please use smart phone to add contact with admin. Once you have added use Kakao to chat with admin.");
        }
        else {
            if (this.isMobileWeb()) {
                // this.alert('isMobileWeb() open kakao plus ulr');
                window.open(this.student_kakaoplus_deeplink);
            }
            else {
                window.open(this.student_kakaoplus_url);
            }
        }
    }


    /**
     * If user is running the site or app on mobile device. It can be a website or a cordova app.
     * It returns true as long as the user is using mobile device.
     */
    isMobile() {
        if (
            this.platform.is('android') ||
            this.platform.is('cordova') ||
            this.platform.is('ios') ||
            this.platform.is('ipad') ||
            this.platform.is('iphone') ||
            this.platform.is('mobile') ||
            this.platform.is('mobileweb') ||
            this.platform.is('phablet') ||
            this.platform.is('tablet')
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Return true if the user is using the site with web browser in mobile phone.
     *
     * @return boolean -
     *      true if user is using web browser in smart phone.
     *      false if user is using app or desktop.
     */
    isMobileWeb() {
        if (this.platform.is('mobileweb')) {
            return true;
        } else {
            return false;
        }
    }

    isApp() {
        if (
            this.platform.is('cordova')
        ) {
            return true;
        } else {
            return false;
        }
    }
    isDesktop() {
        if (this.platform.is('core')) return true;
        else return false;
    }




    /**
     * IE 버전을 리턴한다.
     * 숫자로 8,9,10,11 을 리턴한다.
     * IE 가 아니면 거짓을 리턴한다.
     * 예를 들어 Edge 나 Chrome 은 false 를 리턴한다.
     */
    detectIE() {
        // console.log("ie version: ", window['detect_ie_version']());
        return window['detect_ie_version']();
    }

    checkPhotoURL(url) {
        if (url) return url;
        else return this.anonymousPhotoURL;
    }



    /**
     * @note don't call this method twice.
     *
     * - It request permission to the user.
     * - If user accepts ( or already accepted )
     *      a) check if token updated/changed, if yes, then update it.
     *      b) or don't do anything.
     */
    onetimeInitPushMessage() {
        if (this.isApp()) {
            this.initAppPushMessage();
        }
        else {
            this.initWebPushMessage();
        }
    }

    /**
     * Gets push token string and update it to server only IF it's new.
     * @param token push token string
     */
    updatePushToken() {
        let platform = 'web';
        if (this.isApp()) platform = 'app';
        if (!this.pushToken) {
            console.log("updatePushToken(): token is empty. It will not update. just return.");
            return;
        }
        this.lms.update_push_token(this.pushToken, platform).subscribe(re => {
            // console.log("Token updated:");
        }, e => console.error(e));


    }


    initAppPushMessage() {
        FCMPlugin.getToken(token => {
            this.pushToken = token;
            this.updatePushToken();
            // console.log('initAppPushMessage getToken: ', token);
        });

        //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //Here you define your application behaviour based on the notification data.
        FCMPlugin.onNotification(data => {
            if (data.wasTapped) {
                //Notification was received on device tray and tapped by the user.
                // alert(JSON.stringify(data));
            } else {
                //Notification was received in foreground. Maybe the user needs to be notified.
                // console.log(JSON.stringify(data));
                if (data['body']) this.alert(data['body']);
            }
        });
    }

    initWebPushMessage() {
        this.firebase.messaging.requestPermission()
            .then(() => { /// User accepted 'push notification alert'
                this.firebase.messaging.getToken()
                    .then(currentToken => { /// Got token
                        this.pushToken = currentToken;
                        // console.log("Got token: ", this.pushToken);
                        this.updatePushToken();
                    })
                    .catch(err => {
                        // Failed to get token.
                        console.error('An error occurred while retrieving token. ', err);;
                    });
            })
            .catch(err => { /// If failed to get permission.
                console.error('User rejected/blocked push notification. ', err);
            });

        // Callback fired if Instance ID token is updated.
        this.firebase.messaging.onTokenRefresh(() => {
            this.firebase.messaging.getToken()
                .then(refreshedToken => { // Token refreshed
                    this.pushToken = refreshedToken
                    // console.log("Token Refreshed: ", this.pushToken);
                    this.updatePushToken();
                })
                .catch(err => {
                    // console.log('Unable to retrieve refreshed token ', err);
                });
        });

        // When the user is on the site(opened the site), the user will not get push notification.
        // Instead, you can do whatever in this handler.
        this.firebase.messaging.onMessage(payload => {
            // console.log("Message received. ", payload);
            // ...
            const notification = payload['notification'];
            // const title = notification['title'];
            const body = notification['body'];
            this.alert(body);
        });
    }


    onUserLogin() {
        this.updateLMSInfo();
        this.updatePushToken();
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'login' });
        // console.log("userLogin::Log::");
    }
    /**
     * This method is being called when a user opens 'register' page.
     */
    onUserRegisterPage() {
        this.updatePushToken();
        this.log({ activity: 'open-register' });
    }
    onUserRegister() {
        this.updateLMSInfo();
        this.updatePushToken();
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'register' });
    }
    onUserProfileUpdate() {
        this.updateLMSInfo();
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'update-profile' });
    }


    onLmsReserve(teacher_name) {
        if (!teacher_name) return;
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'reserve', target: teacher_name });
    }
    /**
     * Student and teacher can cancel a class. If a student cancells a class on schedule table, teacher name will have teacher name.
     * If a sesison is cancelled on session reservation list, then there will be no name on teacher name variable.
     * @param teacher_name teacher name of the session
     */
    onLmsCancel(teacher_name = '') {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'cancel', target: teacher_name });
    }

    onUserViewProfile(teacher_name) {
        if (!teacher_name) return;
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'view-profile', target: teacher_name });
    }
    onBeginPayment() {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'payment' });
    }
    onTeacherEvaluateSession(student_name = '') {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'evaluate', target: student_name });
    }
    onStudentCommentToTeacher(teacher_name = '') {
        this.log({ idx_user: this.user.id, name: this.user.name, activity: 'comment', target: teacher_name });
    }


    log(data) {
        // data['name'] = 'test' + (new Date).getTime();
        data['stamp'] = firestore.FieldValue.serverTimestamp();
        // console.log(data);
        const col = this.firebase.db.collection(firestoreLogCollection);
        col.add(data)
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                // col.doc( docRef.id ).get().then( doc => console.log('got doc: ', doc.data()));
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    listenActivityLog() {

        if (!this.teacherTheme) return;
        const db = this.firebase.db;



        db.collection(firestoreLogCollection)
            .orderBy("stamp", "desc")
            .limit(10)
            .get().then(s => {
                s.forEach(doc => {
                    let data = doc.data();
                    data['id'] = doc.id;
                    data['date'] = this.serverTime(data['stamp']);
                    this.activity_log.push(data);
                });
            }).catch(error => {
                console.log("Error getting document:", error);
            });

        db.collection(firestoreLogCollection)
            .orderBy("stamp", "desc")
            .limit(1)
            .onSnapshot(shot => {
                shot.forEach(doc => {
                    let data = doc.data();
                    data['id'] = doc.id;
                    data['date'] = this.serverTime(data['stamp']);
                    const i = this.activity_log.findIndex(v => v['id'] == doc.id);
                    if (i != -1) {
                        this.activity_log[i] = data;
                    }
                    else {
                        this.activity_log.unshift(data);
                        this.activity_log.pop();
                    }
                });
            }, error => {
                console.log("snap error::", error);
            });
    }

    serverTime(obj) {
        let d = new Date(obj);
        return d.toLocaleTimeString();
    }


    translateTimezoneCountry(cname) {
        /**
         * @todo @attention This translation should be done in
         */
        if (this.isKorean) {
            if (!cname) return '(시간대 없음)';
            else if (cname == 'Philippines, China') return '필리핀, 중국';
            else if (cname == 'Korea, Japan') return '한국, 일본';
            else return cname;
        }
        else {
            if (!cname) return '(No timezone)';
            else return cname;
        }

    }



    updateUserTimezone() {
        const info = this.get(KEY_LMS_INFO);
        if (!info || !info['user']) return;
        console.log(info);
        const user = info['user'];
        console.log(`updateUserTimezone: `, user);

        if (user && user['timezone']) {
        }
        else return;

        // this.time = this.a.lms.localeString(this.re['student']['timezone']);
        let date = this.lms.userDate(user['timezone']);
        let hour = date.getHours();
        let ap = '';

        if (hour < 12) ap = 'am';
        else ap = 'pm';
        if (hour != 12) hour = hour % 12;


        let min: any = date.getMinutes();
        if (min < 10) min = '0' + min;



        if (this.isKorean) {
            if (ap == 'am') ap = '오전';
            else ap = '오후';

            this.userTime = user['timezone_country'] + ' '
                + ap + ' '
                + hour + '시 ' + min + '분';
        }
        else {
            this.userTime = user['timezone_country'] + ' '
            + hour + ':' + min + ' ' + ap;
        }

        // console.log(this.userTime);
    }


}
