import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { USER_REGISTER, FILES, USER_UPDATE } from './../../angular-xapi/interfaces';
import { FileUploadWidget } from '../../components/file-upload/file-upload';


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    account: USER_REGISTER = <USER_REGISTER>{};

    tz = {};
    offset;

    files: FILES = [];
    @ViewChild('fileUploadWidget') fileUpload: FileUploadWidget;

    constructor(
        public navCtrl: NavController,
        public a: AppService
    ) {
        this.offset = this.a.lms.getUserLocalTimezoneOffset();
        a.lms.timezones().subscribe(re => {
            console.log(re);
            this.tz = re;
        });

    }

    ngAfterViewInit() { // TEST

    }


    onSubmit() {
        console.log('Submit', this.account);
        if (!this.account.name || !this.account.name.length) return this.a.showAlert(-80021, '*Name is required...');
        if (!this.account.user_email || !this.account.user_email.length) return this.a.showAlert(-80022, '*Email is required...');
        if (!this.account.user_pass || !this.account.user_pass.length) return this.a.showAlert(-80023, '*Password is required...');
        //if( !this.account.nickname || !this.account.nickname.length ) return this.a.showAlert(-80024, '*Nickname is required...');
        this.a.showLoader();

        

        this.account.user_login = this.account.user_email;
        this.account.photoURL = this.files.length ? this.files[0].url : '';
        this.a.user.register(this.account).subscribe(re => {
            console.log("user.register => success: re: ", re);
            
            this.a.lms.timezone_set(this.offset).subscribe(() => { }, () => { });
            this.a.open('home');
        }, reg => {
            
            this.a.hideLoader();
            // alert(reg.message);
            this.a.alert(reg);
        });

    }

    onSuccessUploadPicture() {
        // console.log("onSuccessUpdateProfilePicture::", this.files);
        let data: USER_UPDATE = {
            photoURL: this.files[0].url
        };
        if (this.files.length > 1) {
            data['photoURL'] = this.files[1].url;
            setTimeout(() => this.fileUpload.deleteFile(this.files[0]), 1);
        }


        // this.a.user.update(data).subscribe((res: USER_UPDATE_RESPONSE) => {
        //     this.a.render();
        // }, err => {
        //   this.a.alert(err);
        //     // console.log('error while updating user profile picture', err);
        // });
    }



    keysTimezone() {
        return Object.keys(this.tz).sort((a: any, b: any) => a - b);
    }

    format(offset) {
        if (offset > 0) {
            return '+' + offset;
        }
        else return offset;
    }

}

