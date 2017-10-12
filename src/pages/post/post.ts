import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AppService} from '../../providers/app.service';
import {PAGES, POST_LIST, POST_LIST_RESPONSE} from '../../angular-xapi/interfaces';


@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {

  post_id = null;

  pages: PAGES = [];

  pageNo: number = 0;
  inLoading: boolean = false;
  noMorePosts: boolean = false;

  constructor(
    public navParams: NavParams,
    public a: AppService
  ) {

    this.post_id = navParams.get('post_id');

    this.loadPage();



  }

  loadPage() {
    if (this.noMorePosts) return;
    if (this.inLoading) return;
    else this.inLoading = true;
    this.pageNo++;

    let req: POST_LIST = {
      category_name: this.post_id,
      paged: this.pageNo,
      posts_per_page: 5,
      thumbnail: '200x200'
    };
    // this.loadCache(req);
    this.a.forum.postList(req).subscribe((page: POST_LIST_RESPONSE) => {
      console.log('Page::', page);
      this.inLoading = false;
      if (page.paged == page.max_num_pages) {
        this.noMorePosts = true;
      }
      this.a.forum.prePage( page );
      this.addOrReplacePage(req, page);
    }, err => {
      // this.a.displayError(this.a.getErrorString(err))
    });
  }

  addOrReplacePage(req: POST_LIST, page: POST_LIST_RESPONSE) {
    let i = page.paged - 1;
    if (i < this.pages.length) {
      // console.log("replace cached page for: ", this.app.cacheKeyPage(req));
      this.pages[i] = page;
    }
    else this.pages.push(page);
    // this.a.cacheSetPage(req, page);
  }




}
