import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';



@Component({
  selector: 'student-curriculumn-page',
  templateUrl: 'student-curriculumn.html'
})
export class StudentCurriculumnPage {
    
  constructor(public a: AppService) {
  }
}

