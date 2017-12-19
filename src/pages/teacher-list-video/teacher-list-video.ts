import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { TEACHERS_LIST } from "../../angular-xapi/lms.service";
import { DomSanitizer } from '@angular/platform-browser';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";


@Component({
  selector: 'page-teachers-list-video',
  templateUrl: 'teacher-list-video.html'
})
export class TeacherListVideoPage {

  teachersList: TEACHERS_LIST = [];

  constructor(public a: AppService,
              public sanitizer: DomSanitizer,
              private youtube: YoutubeVideoPlayer
  ) {

    a.lms.teacher_list( { type: 'T' }).subscribe( re => {
      // console.log("user search: ", re);
      this.teachersList = re['users'];
      this.pre(re['users']);
    }, e => a.alert(e));
  }

  pre(teachers) {


    teachers.forEach( teacher => {

      if( teacher.youtube_video_url ){
        if (teacher.youtube_video_url.match(/^http:\/\//i)) teacher.youtube_video_url = teacher.youtube_video_url.replace(/^http:\/\//i, 'https://');//replace http to https
        if (teacher.youtube_video_url.match(/youtu.be/g)) teacher.youtube_video_url = teacher.youtube_video_url.replace(/youtu.be/g, 'youtube.com/embed');//replace youtu.be to youtube.com/embed

        let imageUrl:any = teacher.youtube_video_url.replace(/embed/g, "vi");
        teacher.youtube_thumbnail_url = imageUrl.match(/youtube.com/g, "img.youtube.com") ? imageUrl.replace(/youtube.com/g, "img.youtube.com") + "/mqdefault.jpg":'assets/images/teacher/no-video.jpg';
        // this.youtube_thumbnail_url = this.sanitizer.bypassSecurityTrustUrl(this.youtube_thumbnail_url);

        // console.log("youtube_thumbnail_url", teacher.youtube_thumbnail_url);
        //
        // console.log("userData.youtube_video_url", teacher.youtube_video_url);

        if( teacher.youtube_video_url ) {
          let video = teacher.youtube_video_url.split( "\/");
          teacher.video_id = video[video.length-1];
          let videoUrl = teacher.youtube_video_url + "?autoplay=1&loop=1";
          teacher.youtube_video_url = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
          console.log(teacher);
        }
        else teacher.youtube_video_url = "";



      } else {
        teacher.youtube_video_url = "";
      }
    });

  }

  onClickTeacher(teacher) {
    // console.log(teacher);
    this.a.open('schedule-table', teacher);
  }


  onClickShowVideo(teacher) {
    console.log(teacher);
    if(this.a.isCordova) {
      console.log("platform is::", this.a.isCordova);
      console.log("video_id", teacher.video_id);
      this.youtube.openVideo(teacher.video_id);
    } else if(!teacher.play_video){
      teacher.play_video = true
    }
  }

}
