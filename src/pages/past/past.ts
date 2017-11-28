import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
  selector: 'page-past',
  templateUrl: 'past.html'
})
export class PastPage {
  books = [];
  my_teachers = [];
  show_teacher:number = 0;

  past_class:boolean = false;
  date_begin = null;
  date_end = null;


  constructor( public a: AppService ) {




    this.sessionSearch(this.request());

  }

  request( options = {} ) {
    let defaults = {
      past: true,
      orderby: 'date ASC, class_begin ASC'
    };
    if( this.show_teacher > 0 ) defaults['idx_teacher'] = this.show_teacher;
    if( this.date_begin ) defaults['date_begin']= this.date_begin.replace(/\-/g, '');
    if( this.date_end ) defaults['date_end']= this.date_end.replace(/\-/g, '');
    const req = Object.assign( defaults, options );
    console.log("Request: ", req );
    return req;
  }
  onChangeSearchOption() {
    this.sessionSearch( this.request() );
  }
  sessionSearch( options ) {
    this.a.lms.session_search(options).subscribe(re => {
      console.log("Result of class_search(): ", re);
      this.books = re['books'];
      this.my_teachers = re['my_teachers'];
    }, e => this.a.alert(e));

  }

  onClickSearch() {
    this.sessionSearch(this.request());
  }




}
