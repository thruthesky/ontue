import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppService} from './../../providers/app.service';
import {
  USER_REGISTER, FILES, USER_UPDATE, USER_DATA_RESPONSE,
  USER_UPDATE_RESPONSE
} from './../../angular-xapi/interfaces';
import {FileUploadWidget} from '../../components/file-upload/file-upload';


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
      this.account['nickname'] = userData['nickname'];
      this.account.kakaotalk_id = userData.kakaotalk_id;
      this.user_type = userData.user_type;
      if (userData.photo) this.files[0] = userData.photo;
    }, error => this.a.alert(error));
  }


  onSubmit() {
    console.log('Submit', this.account);
    if (!this.account.name || !this.account.name.length) return this.a.showAlert(-80021, '*Name is required...');
    if (!this.account.user_email || !this.account.user_email.length) return this.a.showAlert(-80022, '*Email is required...');
    if (this.a.user.isLogout && (!this.account.user_pass || !this.account.user_pass.length)) return this.a.showAlert(-80023, '*Password is required...');
    if (!this.user_type || !this.user_type.length) return this.a.showAlert(-80024, '*Please Choose User Type...');
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
      // this.profile_register();
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
    // console.log("onSuccessUpdateProfilePicture::", this.files);
    let data: USER_UPDATE = {
      photoURL: this.files[0].url
    };
    if (this.files.length > 1) {
      data['photoURL'] = this.files[1].url;
      setTimeout(() => this.fileUpload.deleteFile(this.files[0]), 1);
    }

    if (this.a.user.isLogin) {
      data['user_email'] = this.account.user_email;
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

}

