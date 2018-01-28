import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { HowToGetQRCodeComponent } from "../../components/how-to-get-qrcode/how-to-get-qrcode";
import { HowToGetKakaoIDComponent } from "../../components/how-to-get-kakao-id/how-to-get-kakao-id";
import { ModalController } from "ionic-angular";
import { HowToInstallKakaoComponent } from "../../components/how-to-install-kakao/how-to-install-kakao";
import { TeacherPolicyComponent } from "../../components/teacher-policy/teacher-policy";

@Component({
  selector: 'how-to-use-page',
  templateUrl: 'how-to-use.html'
})
export class HowToUsePage {

  showKakaoInstall = false;
  showQRMark = false;
  showKakaotalkID = false;

  _modal = {
    teacherPolicy: TeacherPolicyComponent,
    kakaoInstall: HowToInstallKakaoComponent,
    kakaoID: HowToGetKakaoIDComponent,
    qrmark: HowToGetQRCodeComponent
  };


  constructor(
    public a: AppService,
    public modalCtrl: ModalController
  ) {

  }

  showModalFAQ(modal_name){
    const modal = this.modalCtrl.create( this._modal[modal_name] );
    modal.onDidDismiss(()=> {});
    modal.present();

  }







}

