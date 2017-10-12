import {Injectable} from '@angular/core';
import {XapiService} from './xapi.service';
import {Observable} from 'rxjs/Observable';
import {PAGE, POST, POST_LIST, POST_LIST_RESPONSE} from "./interfaces";



@Injectable()
export class ForumService {

  constructor(private x: XapiService) {

  }

  postCreate(data): Observable<any> {
    data.route = 'post.create';
    // console.log(data);
    return this.x.post(data);
  }

  postList(req: POST_LIST): Observable<POST_LIST_RESPONSE> {
    return this.x.query(req)
  }


  /**
   * This does pre-processing for a post.
   *
   * @attention @warning 'post_content' is sanitized and saved at *post_content_pre*
   *
   * @param post - the post. call by reference.
   * @param o - options
   *          o['safe'] - if it is set to true, it does domSanitizing.
   *          o['autolink'] - if it is set to true, then URL in content will become clickable A tags.
   *
   * @return post - it's call by reference so, no need to save the return value unless you need.
   * @code
   *  this.app.forum.pre( post );
   * @endcode
   */
  pre(post: POST): void {
    post.post_content_pre = this.x.safe(post.post_content);
  }

  /**
   * Does 'pre' process for page.
   * @note parameter 'page' is being referenced. ( meaning, no return value ).
   * @param page page from server
   * @param o options
   * @example
   *      this.app.forum.prePage( page );
   *
   */
  prePage(page: PAGE): void {
    if (page.posts && page.posts.length) {
      for (let i = 0; i < page.posts.length; i++) {
        console.log("hi: ", i);
        this.pre(page.posts[i]);
      }
    }
  }

}
