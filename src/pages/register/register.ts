/**
 *
 * @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.ehcawgq9o2ps
 */
import { Component, ViewChild } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {
  USER_REGISTER, FILES, FILE, USER_UPDATE, USER_DATA_RESPONSE,
  USER_UPDATE_RESPONSE
} from './../../angular-xapi/interfaces';
import { FileUploadWidget } from '../../components/file-upload/file-upload';
import { ModalController, NavParams } from "ionic-angular";
import { HowToGetQRCodeComponent } from "../../components/how-to-get-qrcode/how-to-get-qrcode";
import { HowToGetKakaoIDComponent } from "../../components/how-to-get-kakao-id/how-to-get-kakao-id";


@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class RegisterPage {

  inLoading = false;

  account: USER_REGISTER = <USER_REGISTER>{};
  birthday;
  year: string;
  month: string;
  day: string;

  tz = {};
  offset;

  files: FILES = [];
  qrmarks: FILES = [];
  @ViewChild('fileUploadWidget') fileUpload: FileUploadWidget; // @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.ehcawgq9o2ps
  @ViewChild('fileUploadWidgetQRMARK') fileUploadQRMark: FileUploadWidget;
  user_type: string;


  showQRMark: boolean = false;


  year_now = new Date().getFullYear();

  _modal = {
    kakaoID: HowToGetKakaoIDComponent,
    qrmark: HowToGetQRCodeComponent
  };

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.offset = this.a.lms.getUserLocalTimezoneOffset();
    a.lms.timezones().subscribe(re => {
      console.log(re);
      this.tz = re;
    });

    if (a.user.isLogin) {
      this.loadData();
    } else {
      let register = navParams.data['register'];
      if (register && register['user_email']) this.account = register;
    }

    // console.log("constructor::isLogin::", this.a.user.isLogin);

    // console.log("a.getLanguage()::", a.getLanguage());
    if (a.teacherTheme && !a.getLanguage()) {
      a.setLanguage('en');
    }
  }

  ngAfterViewInit() { // TEST

  }

  loadData() {
    this.inLoading = true;
    this.a.user.data().subscribe((userData: USER_DATA_RESPONSE) => {
      setTimeout( () => this.inLoading = false, 1000 );
      // console.log('userData::', userData);
      this.account.user_email = userData.user_email;
      this.account.name = userData.name;
      this.account['display_name'] = userData['display_name'];
      this.account.phone_number = userData.phone_number;
      this.account.kakaotalk_id = userData.kakaotalk_id;
      this.user_type = userData.user_type;
      if (userData.birthday.length > 0) {
        this.year = userData.birthday.substr(0, 4);
        this.month = userData.birthday.substr(4, 2);
        this.day = userData.birthday.substr(6, 2);
        this.birthday = '' + this.year + '-' + this.month + '-' + this.day; // old
        this.account.birthday = '' + this.year + this.month + this.day;
      }
      this.account.gender = userData.gender;
      if (userData.primary_photo.id) this.files = [userData.primary_photo];
      if (userData.kakao_qrmark_photo.id) {
        this.qrmarks = [userData.kakao_qrmark_photo];
        this.showQRMark = true;
      }
    }, error => {
      this.inLoading = false;
      this.a.alert(error);
    });
  }


  onSubmit() {
    console.log('Submit', this.account);

    if (this.a.teacherTheme) {
      if (!this.user_type || !this.user_type.length) return this.a.showAlert(this.a.i18n['CHOOSE USER TYPE']);
    }

    if (!this.account.user_email || !this.account.user_email.length) return this.a.showAlert(this.a.i18n['EMAIL REQUIRED']);
    if (this.a.user.isLogout && (!this.account.user_pass || !this.account.user_pass.length)) return this.a.showAlert(this.a.i18n['PASSWORD REQUIRED']);
    if (!this.account.name || !this.account.name.length) return this.a.showAlert(this.a.i18n["NAME REQUIRED"]);
    if (this.a.user.isLogin && this.user_type == "T" && !this.qrmarks.length) return this.a.showAlert('*Teacher must upload QR Mark...');
    if (!this.account.phone_number) return this.a.showAlert(this.a.i18n['PHONE NUMBER REQUIRED']);
    if (!this.account.kakaotalk_id) return this.a.showAlert(this.a.i18n['KAKAOTALK ID REQUIRED']);
    //if( !this.account.nickname || !this.account.nickname.length ) return this.a.showAlert(-80024, '*Nickname is required...');

    this.account.photoURL = this.files.length ? this.files[0].url : '';
    this.account.user_type = this.user_type;

    console.log("isLogin::", this.a.user.isLogin);
    console.log(this.account);
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
    if (this.a.teacherTheme && this.patchBirthday()) return;
    this.a.user.register(this.account).subscribe(re => {
      console.log("user.register => success: re: ", re);
      this.account.user_pass = null;
      this.a.lms.timezone_set(this.offset).subscribe(() => {
      }, () => {
      });
      // this.a.open('home');
      this.a.hideLoader();
      this.a.alert( this.a.i18n['REGISTERED']);
      this.a.open('home');
    }, reg => {
      this.a.hideLoader();
      // alert(reg.message);
      this.a.alert(reg);
    });
  }

  profile_update() {
    this.a.showLoader();
    if (this.a.teacherTheme && this.patchBirthday()) return;
    this.a.user.update(this.account).subscribe((res: USER_UPDATE_RESPONSE) => {
      console.log('updateUserInfo:', res);
      this.a.hideLoader();
      this.a.alert( this.a.i18n['UPDATED']);
      this.loadData();
    }, err => {
      this.a.alert(err);
      this.a.hideLoader();
    });
  }


  onSuccessUploadPicture(file) {
    console.log("onSuccessUpdateProfilePicture::", this.files);


    /**
     * Delete previous photo.
     *
     * file[0]
     */
    if (this.files.length > 1) { /// If there are two files, one for prvious photo, the other is for new photo.
      this.fileUpload.deleteFile(this.files[0], () => this.updatePrimaryPhoto(file), () => this.updatePrimaryPhoto(file));
    }
    else this.updatePrimaryPhoto(file);


  }

  updatePrimaryPhoto(file) {

    let data: USER_UPDATE = {
      photoURL: this.files[0].url,
      user_email: this.account.user_email
    };

    if (this.a.user.isLogin) {
      this.a.user.update(data).subscribe((res: USER_UPDATE_RESPONSE) => {

        console.log("updatePrimaryPhoto", file);
        this.files[0] = file;
        this.a.render(100);
        this.a.render(5000); // on mobile, the image is updated very late.
        this.a.render(15000);
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
    this.showQRMark = false;
    if (this.qrmarks.length > 1) {
      this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => { }, e => this.a.alert(e));
    }

    let data: USER_UPDATE = {
      kakao_qrmark_URL: file.url,
      user_email: this.account.user_email
    };
    this.a.user.update(data).subscribe(() => {
      this.a.lms.update_kakao_qrmark_string().subscribe(re => {
        console.log("update_kakao_qrmark_string", re);
        if (!re.kakao_qrmark_string) {
          this.a.alert("Invalid QR MARK, Please try again");
          this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => {
            this.qrmarks = [];
            this.a.render();
          }, e => this.a.alert(e));
        }
        else {
          this.qrmarks = [file];
          this.showQRMark = true;
          this.a.render();
        }
      }, e => this.a.alert(e));
    }, e => this.a.alert(e));
  }


  patchBirthday() { // 19881105 (YYYYMMDD)
    // console.log("Birthday:: ",this.birthday);
    this.account.birthday = this.year + this.month + this.day
    // console.log("Birthday:: ",this.account.birthday);
  }

  showModalFAQ(modal_name){
    const modal = this.modalCtrl.create( this._modal[modal_name] );
    modal.onDidDismiss(()=> {});
    modal.present();

  }


  onClickKakaoIDHelp() {
    if ( this.a.isTeacher ) {
      this.showModalFAQ('kakaoID');
    }
    else {
      this.a.alert("프로필 관리 메뉴에서 카카오톡 아이디를 찾을 수 있습니다.");
    }
  }


}

