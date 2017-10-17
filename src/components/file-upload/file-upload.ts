import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {AppService} from './../../providers/app.service';
import {FILES, FILE, FILE_DELETE} from './../../angular-xapi/interfaces';
import {AlertController} from "ionic-angular";

declare var Camera;
declare var navigator;
declare var FileUploadOptions;
declare var FileTransfer;

@Component({
  selector: 'file-upload-widget',
  templateUrl: 'file-upload.html'
})
export class FileUploadWidget {
  url: string;
  progressPercentage = 0;
  @Input() files: FILES;
  @Input() post_password;
  @Input() title: boolean = true;
  @Input() fileSelectionButton: boolean = true;
  @Input() showUploadedFiles: boolean = true;
  @Output() success = new EventEmitter<any>();

  @Input() titleText = 'File Upload';

  constructor(public a: AppService,
              public alertCtrl: AlertController) {
    this.url = this.a.xapi.getServerUrl();
    document.addEventListener('deviceready', () => this.onDeviceReady(), false);
  }

  onDeviceReady() {
    console.log("Cordova is ready.");
  }

  ionViewDidLoad() {
    if (!this.files) alert(`[files] property for binding is not initialized on template.`);
  }

  onClickCamera() {
    if (!this.a.xapi.isCordova()) return;

    let confirm = this.alertCtrl.create({
      title: 'Photo Upload',
      message: 'Where do you want to get photo from?',
      buttons: [
        {
          text: 'camera',
          handler: () => {
            console.log('camera');
            this.takePhoto('camera');
          }
        },
        {
          text: 'gallery',
          handler: () => {
            console.log('gallery');
            this.takePhoto('gallery');
          }
        },
        {
          text: 'cancel',
          handler: () => {
            console.log('cancel');
            this.takePhoto('cancel');
          }
        }
      ]
    });
    confirm.present();
  }

  takePhoto(code) {
    let type = null;

    if (code == 'camera') {
      // get the picture from camera.
      type = Camera.PictureSourceType.CAMERA;
    }
    else if (code == 'gallery') {
      // get the picture from library.
      type = Camera.PictureSourceType.PHOTOLIBRARY
    }
    else return;

    console.log("in cordova, type: ", type);

    let options = {
      quality: 90,
      sourceType: type
    };
    navigator.camera.getPicture(path => {
      console.log('photo: ', path);
      // alert(path);
      // transfer the photo to the server.
      this.cordovaTransferFile(path);
    }, e => {
      console.error('camera error: ', e);
      alert("camera error");
    }, options);
  }

  cordovaTransferFile(filePath: string) {
    var options = new FileUploadOptions();
    options.fileKey = "userfile";
    options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1) + '.jpg';
    options.mimeType = "image/jpeg";
    var params = {route: 'file.upload', session_id: this.a.user.sessionId};
    options.params = params;


    var ft = new FileTransfer();

    let percentage = 0;
    ft.onprogress = progressEvent => {
      if (progressEvent.lengthComputable) {
        try {
          percentage = Math.round(progressEvent.loaded / progressEvent.total);
        }
        catch (e) {
          // console.error( 'percentage computation error' );
          percentage = 10;
        }
      }
      else percentage = 10; // progressive does not work. it is not computable.
      // console.log('percentage: ', percentage);
      this.onProgress(percentage);
    };

    let uri = encodeURI(this.url);

    console.log(filePath);
    console.log(uri);
    console.log(options);

    ft.upload(filePath, uri, r => {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      let re;
      try {
        re = JSON.parse(r.response);
      }
      catch (e) {
        this.a.showAlert("JSON parse error on server response while file transfer...");
        return;
      }

      if (re['code'] == 0) {
        this.insertFile(re['data']);
      }
      else this.a.showError(re);


    }, e => {
      console.log("upload error source " + e.source);
      console.log("upload error target " + e.target);
      this.a.showAlert(e.code);
      this.onUploadFailure();
    }, options);
  }

  onChangeFile(event) {
    // console.log('onChangeFile', event);
    if (this.a.xapi.isCordova()) return;
    // console.log('onChangeFile', event);
    this.a.file.uploadForm(event).subscribe(event => {
      // console.log(event);
      if (typeof event === 'number') {
        // console.log(`File is ${event}% uploaded.`);
        this.onProgress(event);
      }
      else if (event.id !== void 0) {
        // console.log('File is completely uploaded!');
        // console.log(event);
        this.insertFile(event);
      }
      else if (event === null) {
        console.log("what is it?");
      }
      else if (event['code']) {
        this.a.showError(event);
      }
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log(err);
        if (err.message == 'file_is_not_selected' || err.message == 'file_is_not_selected_or_file_does_not_exist') {
          this.a.showAlert('File uploaded cancelled. No file was selected.');
        }
        else this.a.showAlert('File upload filed. Filesize is too large? ' + err.message);
      }
      this.onUploadFailure();
    });
  }

  onClickDeleteButton(file) {
    this.deleteFile(file);
  }

  deleteFile(file: FILE) {
    let data: FILE_DELETE = {};

    data.id = file.id;
    data.post_password = this.post_password;

    this.a.file.delete(data).subscribe(id => {
      console.log("file deleted: ", id);
      // this.files = this.files.filter( file => file.id != id ); //
      let index = this.files.findIndex(file => file.id == id);
      this.files.splice(index, 1);
      console.log('onClickDeleteButton::', this.files);
      this.a.xapi.render();
    }, err => this.a.showError(err));
  }

  onProgress(p: number) {
    this.progressPercentage = p;
    this.a.xapi.render();
  }

  insertFile(file) {
    this.files.push(file);
    console.log("this.files: ", this.files);
    this.progressPercentage = 0;
    this.success.emit(file);
    this.a.xapi.render();
  }

  onUploadFailure() {
    this.progressPercentage = 0;
  }


}
