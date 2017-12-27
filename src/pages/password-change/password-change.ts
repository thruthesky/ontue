import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { USER_CHANGE_PASSWORD } from "../../angular-xapi/interfaces";


@Component({
  selector: 'password-change',
  templateUrl: 'password-change.html'
})
export class PasswordChangePage {

  changePassword: USER_CHANGE_PASSWORD = <USER_CHANGE_PASSWORD>{};



  constructor(
    public a: AppService
  ) {

  }


  onClickChangePassword() {
    this.a.user.changePassword(this.changePassword).subscribe(re => {
      console.log('onClickChangePassword', re);
      this.a.showAlert("Change Password", "Password Changed...")
    }, e => {
      this.a.alert(e);
    });
  }



}
