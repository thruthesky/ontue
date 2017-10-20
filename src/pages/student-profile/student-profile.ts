import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import {FILES, USER_DATA_RESPONSE, USER_UPDATE, USER_UPDATE_RESPONSE} from './../../angular-xapi/interfaces';
import {FileUploadWidget} from '../../components/file-upload/file-upload';

@Component({
  selector: 'page-student-profile',
  templateUrl: 'student-profile.html'
})
export class StudentProfilePage {

  account = <USER_UPDATE>{};

  files: FILES = [];
  @ViewChild('fileUploadWidget') fileUpload: FileUploadWidget;

  constructor(
    public navCtrl: NavController,
    public a: AppService) {

    if( !a.user.isLogin ) {
      this.a.showAlert(this.a.xapi.ERROR.LOGIN_FIRST, 'User must login');
      this.a.open('login');
    }


    this.a.user.data().subscribe( (userData:USER_DATA_RESPONSE) => {
      console.log('userData::', userData);
      this.account.user_email = userData.user_email;
      this.account.name = userData.name;
      this.account.display_name = userData.display_name;
      if( userData.photo ) this.files[0] = userData.photo;
    }, error => this.a.alert(error));

  }

  onSubmit() {
    this.a.showLoader();
    this.a.user.update(this.account).subscribe((res: USER_UPDATE_RESPONSE) => {
      console.log('updateUserInfo:', res);
      this.a.hideLoader();
    }, err => {
      this.a.alert(err);
      this.a.hideLoader();
    });
  }



  onSuccessUploadPicture() {
    // console.log("onSuccessUpdateProfilePicture::", this.files);
    let data: USER_UPDATE = {
      user_email: this.account.user_email,
      photoURL: this.files[0].url
    };
    if( this.files.length > 1 ) {
      data['photoURL']= this.files[1].url;
      setTimeout( () => this.fileUpload.deleteFile( this.files[0] ), 1 );
    }
    this.a.user.update(data).subscribe((res: USER_UPDATE_RESPONSE) => {
      this.files[0] = res.photo;
      this.a.render();
    }, err => {
      this.a.alert(err);
      // console.log('error while updating user profile picture', err);
    });
  }



}
