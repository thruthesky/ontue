import {Component, ViewChild} from '@angular/core';
import {AppService} from './../../providers/app.service';
import {
  FILES, USER_UPDATE, USER_DATA_RESPONSE, USER_UPDATE_RESPONSE,
} from './../../angular-xapi/interfaces';
import {FileUploadWidget} from '../../components/file-upload/file-upload';


@Component({
  selector: 'page-teacher-curriculum-vitae',
  templateUrl: 'teacher-curriculum-vitae.html'
})
export class TeacherCurriculumVitaePage {


  account: USER_UPDATE = <USER_UPDATE>{};

  files: FILES = [];
  @ViewChild('fileUploadWidget') fileUpload: FileUploadWidget;

  constructor(public a: AppService) {


    if (a.user.isLogin) {
      this.loadData();
    }


  }

  loadData() {
    this.a.user.data().subscribe((userData: USER_DATA_RESPONSE) => {
      console.log('userData::', userData);
      this.account.name = userData.name;
      this.account.fullname = userData.fullname;
      this.account.nickname = userData.nickname;
      this.account.user_email = userData.user_email;
      this.account.phone_number = userData.phone_number;
      this.account.gender = userData.gender;
      this.account.birthday = userData.birthday;
      this.account.address = userData.address;
      this.account.nationality = userData.nationality;
      this.account.last_education = userData.last_education;
      this.account.major = userData.major;
      this.account.experience = userData.experience;
      this.account.introduction = userData.introduction;
      this.account['display_name'] = userData['display_name'];
      this.account.kakaotalk_id = userData.kakaotalk_id;
      if (userData.primary_photo.id) this.files[0] = userData.primary_photo;
    }, error => this.a.alert(error));
  }

  onSubmitUpdate() {
    console.log("onSubmitUpdate", this.account);
    if (!this.account.name || !this.account.name.length) return this.a.showAlert(-80021, '*Name is required...');
    if (!this.account.user_email || !this.account.user_email.length) return this.a.showAlert(-80022, '*Email is required...');

    // this.account.photoURL = this.files.length ? this.files[0].url : '';

    this.a.showLoader();
    this.a.user.update(this.account).subscribe((res: USER_UPDATE_RESPONSE) => {
      console.log('curriculum vitae:', res);
      this.a.hideLoader();
      this.a.alert('Curriculum vitae Updated');
      this.loadData();
    }, err => {
      this.a.alert(err);
      this.a.hideLoader();
    });
  }


}
