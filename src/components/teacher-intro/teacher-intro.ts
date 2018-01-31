import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {USER_LOGIN, USER_REGISTER} from "../../angular-xapi/interfaces";
@Component({
  selector: 'teacher-intro-component',
  templateUrl: 'teacher-intro.html'
})

export class TeacherIntroComponent {


  _login:USER_LOGIN = <USER_LOGIN>{};

  _register: USER_REGISTER = <USER_REGISTER>{};

  constructor(
    public a: AppService
  ) {


  }

  ngOnInit() {

  }

  onSubmit() {
    console.log("Going to Login:: ");
    this.a.showLoader();
    this.a.user.login( this._login.user_email, this._login.user_pass ).subscribe(re => {
      // this.loading = false;
      console.log("user.login => success: re...: ", re);
      this.a.updatePushToken();
      this.a.open('home');
    }, e => {
      // this.loading = false;
      this.a.hideLoader();
      this.a.alert(e);
    });
  }


  onRegister() {
    console.log("Going to Register:: ");
    this.a.open('register', {register: this._register});
  }


}
