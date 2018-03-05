import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'teacher-leveltest-component',
  templateUrl: 'teacher-leveltest.html'
})

export class TeacherLeveltestComponent {


  view = 1;
  selectedVideo = null;
  youtube = ["www.youtube.com/watch?v=Mw-be1sYQls","www.youtube.com/watch?v=I7Jol4-xGpA"];
  urlYoutube = null;

  constructor(
    public a: AppService,
    public domSanitizer: DomSanitizer
  ) {}


  playTeacherYoutube(video = 0) {
    let url = this.a.getYoutubeUrl(this.a.getYoutubeID(this.youtube[video]));
    this.urlYoutube = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    this.view= 2;
    this.selectedVideo = video;

  }

}
