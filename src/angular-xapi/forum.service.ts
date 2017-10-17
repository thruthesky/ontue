import {Injectable} from '@angular/core';
import {XapiService} from './xapi.service';
import {Observable} from 'rxjs/Observable';
import {PAGE, POST, POST_DATA, POST_LIST, POST_LIST_RESPONSE, SITE_PREVIEW} from "./interfaces";
import {UserService} from "./user.service";



@Injectable()
export class ForumService {

  constructor(
    private x: XapiService,
    private user: UserService
  ) {

  }

  postCreate(data): Observable<any> {
    data.session_id = this.user.sessionId;
    data.route = 'post.create';
    // console.log(data);
    return this.x.post(data);
  }

  postData(post_ID): Observable<POST> {
    let data: POST_DATA = {
      session_id: this.user.sessionId,
      route: 'wordpress.get_post',
      ID: post_ID,
      thumbnail: '200x200'
    };
    return this.x.post(data)
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
        this.pre(page.posts[i]);
      }
    }
  }

  /**
   *
   * getUrlOnTextBegin() 이 text 앞 부분에서 URL 을 가져온다면,
   * getUrlOnText() 는 text 에서 맨 처음 나타나는 URL 을 리턴한다.
   * http:// 또는 https:// 로 시작하고, 문자가 있으면 URL 로 인식한다.
   *
   * @param text
   *
   * @return URL 이 없으면 null, 있으면 URL 을 리턴한다.
   *
   * @tests - Below are test.

   "abc"         ===> null
   "abc def http"         ===> null
   "abc http://www.com "         ===> http://www.com
   "https:// philgo.com abc"         ===> null
   "https://philgo.com abc"         ===> https://philgo.com
   " https://philgo.com abc"         ===> https://philgo.com
   "  abc http://www.philgo.com?qna&idx=123"         ===> http://www.philgo.com?qna&idx=123
   "  http://jjj http://www.philgo.com?qna&idx=123"         ===> http://jjj
   "  https:// http:// http://www.philgo.com#/#/push-id&a=b "         ===> http://www.philgo.com#/#/push-id&a=b

   * @end of tests
   */
  getUrlOnText(text) {
    let re = text.match(/https?:\/\/[^\s]+/);
    if (re) return re[0];
    return null;
  }

  /**
   * 입력된 문자열 text 에서 최대 len 길이 만큼 문자열을 리턴한다.
   * @note 이 문자열은 주로 제목으로 쓰인다. 물론 다른 용도로 사용 가능하다.
   *
   * @logic
   *      1. 빈 문자열이거나 공백 문자열이면 '' 를 리턴한다.
   *      2. 첫 부분 문자열이 URL 이면, '' 을 리턴한다.
   *      3. text 의 전체 글 수가 10자 이하이면, '' 를 리턴한다.
   *
   * @note 위 조건에서는 text 맨 처음에 URL 이 있으면 안되지만, 중간부터는 된다. 예를 들면,
   *      아래와 같은 경우, URL 이 리턴된다.
   *      "처음에 URL 주소는 안되지만, https://www.philgo.com/?1273358785"
   *
   * @param text 문자열
   */
  getTitleOnTextBegin(text, len = 60) {
    if (!text) return '';
    text = text.trim(); /// // text = text.replace(/^\s+|\s+$/gm,''); // trim for old browsers.
    text = text.replace(/\s+/g, " "); // make multi-lines into one line.
    if (!text) return '';
    if (text.length < 10) return '';
    if (text.indexOf('http') === 0) return '';
    return this.wordcut(text, 60);
  }

  preview(url: string): Observable<SITE_PREVIEW> {
    return this.x.post({ route: 'wordpress.site_preview', session_id: this.user.sessionId, url: url });
  }
  deletePreview(id: number): Observable<SITE_PREVIEW> {
    return this.x.post({ route: 'wordpress.delete_site_preview', session_id: this.user.sessionId, id: id });
  }

  /**
   *
   * @param s - the string
   * @param n - the positing to cut. if the n'th position is not a blank, then it searches after the n'th position.
   */
  wordcut(s, n = 10) {
    let cut = s.indexOf(' ', n);
    if (cut == -1) return s;
    return s.substring(0, cut)
  }

}
