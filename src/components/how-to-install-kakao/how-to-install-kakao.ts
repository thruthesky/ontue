import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
@Component({
  selector: 'how-to-install-kakao-component',
  templateUrl: 'how-to-install-kakao.html'
})

export class HowToInstallKakaoComponent {

  constructor(
    public a: AppService
  ) {

  }

  ngOnInit() {

  }


}
