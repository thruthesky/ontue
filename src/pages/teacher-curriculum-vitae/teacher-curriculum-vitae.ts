import {Component, ViewChild} from '@angular/core';
import {AppService} from './../../providers/app.service';
import {
  FILES, USER_UPDATE, USER_DATA_RESPONSE, USER_UPDATE_RESPONSE, FILE,
} from './../../angular-xapi/interfaces';
import {FileUploadWidget} from '../../components/file-upload/file-upload';


@Component({
  selector: 'page-teacher-curriculum-vitae',
  templateUrl: 'teacher-curriculum-vitae.html'
})
export class TeacherCurriculumVitaePage {


  account: USER_UPDATE = <USER_UPDATE>{};

  files: FILES = [];
  qrmarks: FILES = [];
  @ViewChild('fileUploadWidget') fileUpload: FileUploadWidget;
  @ViewChild('fileUploadWidgetQRMARK') fileUploadQRMark: FileUploadWidget;

  showQRMark: boolean = false;

  constructor(
    public a: AppService
  ) {
    if (a.user.isLogin && a.isTeacher) {
      this.loadData();
    }
    else {
      a.open('home');
      a.alert("User type must be teacher and should login first...");
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
      if (userData.primary_photo.id) this.files = [ userData.primary_photo ];
      if (userData.kakao_qrmark_photo.id){
        this.qrmarks = [ userData.kakao_qrmark_photo ];
        this.showQRMark = true;
      }
    }, error => this.a.alert(error));
  }

  onSubmitUpdate() {
    console.log("onSubmitUpdate", this.account);
    if (!this.account.name || !this.account.name.length) return this.a.showAlert(-80021, '*Name is required...');
    if (!this.account.user_email || !this.account.user_email.length) return this.a.showAlert(-80022, '*Email is required...');
    if (!this.qrmarks.length ) return this.a.showAlert(-80025, '*Teacher must upload QR Mark...');
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


  onSuccessUploadPicture(file: FILE) {
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
        this.a.render();
      }, err => {
        this.a.alert(err);
      });
    }

  }




  onSuccessUploadQRMark(file: FILE) {
    this.showQRMark = false;
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
          this.showQRMark = true;
          this.a.render();
        }
      }, e => this.a.alert(e));
    }, e => this.a.alert(e));
  }



}
