/**
 *
 * @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.ehcawgq9o2ps
 */
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import {
  USER_REGISTER, FILES, FILE, USER_UPDATE, USER_DATA_RESPONSE,
  USER_UPDATE_RESPONSE
} from './../../angular-xapi/interfaces';
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
  qrmarks: FILES = [];
  @ViewChild('fileUploadWidget') fileUpload: FileUploadWidget; // @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.ehcawgq9o2ps
  @ViewChild('fileUploadWidgetQRMARK') fileUploadQRMark: FileUploadWidget;
  user_type: string;

  constructor(public navCtrl: NavController,
    public a: AppService) {
    this.offset = this.a.lms.getUserLocalTimezoneOffset();
    a.lms.timezones().subscribe(re => {
      console.log(re);
      this.tz = re;
    });

    if (a.user.isLogin) {
      this.loadData();
    }

    console.log("constructor::isLogin::", this.a.user.isLogin);
  }

  ngAfterViewInit() { // TEST

  }

  loadData() {
    this.a.user.data().subscribe((userData: USER_DATA_RESPONSE) => {
      console.log('userData::', userData);
      this.account.user_email = userData.user_email;
      this.account.name = userData.name;
      this.account['display_name'] = userData['display_name'];
      this.account.kakaotalk_id = userData.kakaotalk_id;
      this.user_type = userData.user_type;
      if ( userData.primary_photo.id ) this.files[0] = userData.primary_photo;
      if ( userData.kakao_qrmark_photo.id ) this.qrmarks = [ userData.kakao_qrmark_photo ];
    }, error => this.a.alert(error));
  }


  onSubmit() {
    console.log('Submit', this.account);
    if (!this.account.name || !this.account.name.length) return this.a.showAlert(-80021, '*Name is required...');
    if (!this.account.user_email || !this.account.user_email.length) return this.a.showAlert(-80022, '*Email is required...');
    if (this.a.user.isLogout && (!this.account.user_pass || !this.account.user_pass.length)) return this.a.showAlert(-80023, '*Password is required...');
    if (!this.user_type || !this.user_type.length) return this.a.showAlert(-80024, '*Please Choose User Type...');
    if (this.user_type == "T" && !this.qrmarks.length ) return this.a.showAlert(-80025, '*Teacher must upload QR Mark...');
    //if( !this.account.nickname || !this.account.nickname.length ) return this.a.showAlert(-80024, '*Nickname is required...');

    this.account.photoURL = this.files.length ? this.files[0].url : '';
    this.account.user_type = this.user_type;
    console.log("isLogin::", this.a.user.isLogin);
    if (this.a.user.isLogin) { // UPDATE
      console.log('GOING TO UPDATE');
      this.profile_update();
    }
    else { // REGISTER
      console.log('GOING TO REGISTER');
      this.profile_register();
    }

  }

  profile_register() {
    this.account.user_login = this.account.user_email;
    this.a.user.register(this.account).subscribe(re => {
      console.log("user.register => success: re: ", re);
      this.account.user_pass = null;
      this.a.lms.timezone_set(this.offset).subscribe(() => {
      }, () => {
      });
      // this.a.open('home');
      this.a.hideLoader();
      this.a.alert('registered');
    }, reg => {
      this.a.hideLoader();
      // alert(reg.message);
      this.a.alert(reg);
    });
  }

  profile_update() {
    this.a.showLoader();
    this.a.user.update(this.account).subscribe((res: USER_UPDATE_RESPONSE) => {
      console.log('updateUserInfo:', res);
      this.a.hideLoader();
      this.a.alert('Profile Updated');
      this.loadData();
    }, err => {
      this.a.alert(err);
      this.a.hideLoader();
    });
  }


  onSuccessUploadPicture() {
    console.log("onSuccessUpdateProfilePicture::", this.files);


    /**
     * Delete previous photo.
     *
     * file[0]
     */
    if (this.files.length > 1) { /// If there are two files, one for prvious photo, the other is for new photo.
      this.fileUpload.deleteFile(this.files[0], () => this.updatePrimaryPhoto(), () => this.updatePrimaryPhoto());
    }
    else this.updatePrimaryPhoto();


  }

  updatePrimaryPhoto() {

    let data: USER_UPDATE = {
      photoURL: this.files[0].url,
      user_email: this.account.user_email
    };

    if (this.a.user.isLogin) {
      this.a.user.update(data).subscribe((res: USER_UPDATE_RESPONSE) => {
        this.files[0] = res.photo;
        this.a.render();
      }, err => {
        this.a.alert(err);
      });
    }

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


  onClickType() { // User select user type.
    if (this.a.user.isLogout) return;
    this.a.showLoader();
    this.a.lms.setUserType(this.user_type).subscribe(re => { // update on server
      this.a.user.loadProfile() // reload user profile.
        .subscribe(re => {
          console.log(re);
          this.user_type = re['user_type'];
          this.a.hideLoader();
        },
        e => {
          this.a.alert(e);
          this.a.hideLoader();
        });
    }, e => {
      this.a.alert(e);
      this.a.hideLoader();
    });

  }

  onSuccessUploadQRMark(file: FILE) {

    if (this.qrmarks.length > 1) {
      this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => {}, e => this.a.alert(e));
    }

    let data: USER_UPDATE = {
      kakao_qrmark_URL: file.url,
      user_email: this.account.user_email
    };
    this.a.user.update(data).subscribe(() => {
      this.a.lms.update_kakao_qrmark_string().subscribe(re => {
        console.log("update_kakao_qrmark_string",re);
        if( !re.kakao_qrmark_string ) {
          this.a.alert("Invalid QR MARK, Please try again");
          this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => {
            this.qrmarks = [];
            this.a.render();
          }, e => this.a.alert(e));
        }
        else {
          this.qrmarks = [file];
          this.a.render();
        }
      }, e => this.a.alert(e));
    }, e => this.a.alert(e));
  }
}

