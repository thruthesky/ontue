import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { USER_REGISTER, FILES, USER_UPDATE, USER_UPDATE_RESPONSE } from './../../angular-xapi/interfaces';
import { FileUploadWidget } from '../../components/file-upload/file-upload';


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    account = <USER_REGISTER>{};



    files: FILES = [];
    @ViewChild('fileUploadWidget') fileUpload: FileUploadWidget;
    
    constructor(
        public navCtrl: NavController,
        public a: AppService
    ) {

    }

    ngAfterViewInit() { // TEST

    }


    onSubmit() {
        this.a.showLoader();
        this.account.user_login = this.account.user_email;
        this.account.photoURL = this.files.length ? this.files[0].url : '';
        this.a.user.register( this.account ).subscribe(re => {
            console.log("user.register => success: re: ", re);
            this.a.open('home');
        }, reg => {
            this.a.hideLoader();
            alert(reg.message);
        });

    }

    onSuccessUploadPicture() {
        // console.log("onSuccessUpdateProfilePicture::", this.files);
        let data: USER_UPDATE = {
            photoURL: this.files[0].url
        };
        if( this.files.length > 1 ) {
            data['photoURL']= this.files[1].url;
            setTimeout( () => this.fileUpload.deleteFile( this.files[0] ), 1 );
        }
        this.a.user.update(data).subscribe((res: USER_UPDATE_RESPONSE) => {
            this.a.render();
        }, err => {
            // console.log('error while updating user profile picture', err);
        });
    }

}

