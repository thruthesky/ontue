import {Component, ViewChild} from '@angular/core';
import {AppService} from './../../providers/app.service';
import {
  FILES, USER_UPDATE, USER_DATA_RESPONSE, USER_UPDATE_RESPONSE, FILE,
} from './../../angular-xapi/interfaces';
import {FileUploadWidget} from '../../components/file-upload/file-upload';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


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
  birthday;
  today = new Date();
  minYear: number;

  youtube_thumbnail_url: string = "";
  youtube_video_url: SafeResourceUrl = "";
  play_video: boolean = false;

  constructor(
    public a: AppService,
    public sanitizer: DomSanitizer
  ) {
    this.minYear = this.today.getFullYear() - 10;


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
      // console.log('userData::', userData);
      this.account.name = userData.name;
      this.account.fullname = userData.fullname;
      this.account.nickname = userData.nickname;
      this.account.user_email = userData.user_email;
      this.account.phone_number = userData.phone_number;
      this.account.gender = userData.gender;
      if ( userData.birthday.length > 0 ) {
        this.birthday = userData.birthday.substr(0,4) + '-' + userData.birthday.substr(4,2) + '-' + userData.birthday.substr(6,2);
        this.account.birthday = this.birthday;
      }
      this.account.address = userData.address;
      this.account.nationality = userData.nationality;
      this.account.last_education = userData.last_education;
      this.account.major = userData.major;
      this.account.school = userData.school;
      this.account.hobby = userData.hobby;
      this.account.experience = userData.experience;
      this.account.introduction = userData.introduction;
      this.account['display_name'] = userData['display_name'];
      this.account.kakaotalk_id = userData.kakaotalk_id;



      if( userData.youtube_video_url ){
        this.account.youtube_video_url = userData.youtube_video_url;
        if (userData.youtube_video_url.match(/^http:\/\//i)) userData.youtube_video_url = userData.youtube_video_url.replace(/^http:\/\//i, 'https://');//replace http to https
        if (userData.youtube_video_url.match(/youtu.be/g)) userData.youtube_video_url = userData.youtube_video_url.replace(/youtu.be/g, 'youtube.com/embed');//replace youtu.be to youtube.com/embed

        let imageUrl:any = userData.youtube_video_url.replace(/embed/g, "vi");
        this.youtube_thumbnail_url = imageUrl.match(/youtube.com/g, "img.youtube.com") ? imageUrl.replace(/youtube.com/g, "img.youtube.com") + "/mqdefault.jpg":'assets/images/teacher/no-video.jpg';
        // this.youtube_thumbnail_url = this.sanitizer.bypassSecurityTrustUrl(this.youtube_thumbnail_url);

        // console.log("youtube_thumbnail_url", this.youtube_thumbnail_url);
        //
        // console.log("userData.youtube_video_url", userData.youtube_video_url);

        if( userData.youtube_video_url ) {
          let videoUrl = userData.youtube_video_url + "?autoplay=1&loop=1";
          this.youtube_video_url = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
        }
        else this.youtube_video_url = "";

      } else {
        this.account.youtube_video_url = "";
      }


      if (userData.primary_photo.id) this.files = [ userData.primary_photo ];
      if (userData.kakao_qrmark_photo.id){
        this.qrmarks = [ userData.kakao_qrmark_photo ];
        this.showQRMark = true;
      }


      this.account.kakao_qrmark_string = userData.kakao_qrmark_string;
      this.account.kakao_qrmark_URL = userData.kakao_qrmark_URL;
      if ( this.account.kakao_qrmark_URL && ! this.account.kakao_qrmark_string ) {
        this.a.lms.update_kakao_qrmark_string().subscribe( re => {
          // console.log( re );
          if ( re['kakao_qrmark_string'] ) {
            this.account.kakao_qrmark_string = re['kakao_qrmark_string'];
          }
        }, e => this.a.alert( e ) );
      }
    }, error => this.a.alert(error));
  }

  onSubmitUpdate() {
    // console.log("onSubmitUpdate", this.account);
    if (!this.account.name || !this.account.name.length) return this.a.showAlert(-80021, '*Name is required...');
    if (!this.account.user_email || !this.account.user_email.length) return this.a.showAlert(-80022, '*Email is required...');
    if (!this.qrmarks.length ) return this.a.showAlert(-80025, '*Teacher must upload QR Mark...');
    // this.account.photoURL = this.files.length ? this.files[0].url : '';

    delete this.account.kakao_qrmark_string;
    delete this.account.kakao_qrmark_URL;

    this.a.showLoader();
    this.a.user.update(this.account).subscribe((res: USER_UPDATE_RESPONSE) => {
      // console.log('curriculum vitae:', res);
      this.a.hideLoader();
      this.a.alert('Curriculum vitae Updated');
      this.loadData();
    }, err => {
      this.a.alert(err);
      this.a.hideLoader();
    });
  }


  onSuccessUploadPicture(file: FILE) {

    // console.log("onSuccessUpdateProfilePicture::file:: ", file);
    // console.log("onSuccessUpdateProfilePicture::files:: ", this.files);
    //

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

        // console.log("updatePrimaryPhoto", file);
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
        // console.log("update_kakao_qrmark_string",re);
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
      }, () => {
        this.a.alert("Failed to convert QR mark. There may be an error on server while converting QR mark.");
        this.fileUploadQRMark.deleteFile(this.qrmarks[0], () => {
          this.qrmarks = [];
          this.a.render();
        }, e => this.a.alert(e));
      });
    }, e => this.a.alert(e));
  }


  onChangeBirthDate() {
    // console.log("Birthday:: ",this.birthday);
    this.account.birthday = this.birthday.replace(/\-/g, '');
    // console.log("Birthday:: ",this.account.birthday);
  }

}
