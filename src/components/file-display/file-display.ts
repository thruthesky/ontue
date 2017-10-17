import { Component, Input } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { FILES } from './../../angular-xapi/interfaces';

@Component({
  selector: 'file-display-widget',
  templateUrl: 'file-display.html'
})

export class FileDisplayWidget {

  @Input() files: FILES;
  constructor(
    public a: AppService
  ) {}

}
