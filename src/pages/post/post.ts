import {Component} from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
import {AppService} from '../../providers/app.service';
import {PAGES, POST, POST_LIST, POST_LIST_RESPONSE} from '../../angular-xapi/interfaces';
import {PostCreateEditPage} from "../post-create-edit/post-create-edit";


@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {

  post_id = null;

  pages: PAGES = [];

  watch = null;
  pageNo: number = 0;
  noMorePosts: boolean = false;

  constructor(public navParams: NavParams,
              public a: AppService,
              public modalCtrl: ModalController
  ) {

    this.post_id = navParams.get('post_id');
    this.loadPage();


  }

  loadPage(infiniteScroll?) {
    if (this.noMorePosts) return;
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
      if (page.paged == page.max_num_pages) {
        this.noMorePosts = true;
      }
      this.a.forum.prePage(page);
      this.addOrReplacePage(req, page);
      if (infiniteScroll) infiniteScroll.complete();
    }, err => {
      this.a.showError(err);
      if (infiniteScroll) infiniteScroll.complete();
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
    this.a.xapi.render();
  }

  onClickLike(post: POST, choice: 'like' | 'dislike') {
    if (this.a.user.isLogout) return this.a.alert(this.a.xapi.ERROR.LOGIN_FIRST);
    this.a.xapi.post({route: 'wordpress.post_like', choice: choice, ID: post.ID, session_id: this.a.user.sessionId})
      .subscribe(re => {
        console.log("like: ", re);
        post.meta['like'] = re['like'];
        post.meta['dislike'] = re['dislike'];
      }, err => this.a.showError(err));
  }

  doInfinite(infiniteScroll) {
    if (this.noMorePosts) return infiniteScroll.complete();
    this.loadPage(infiniteScroll);
  }


  onClickPostCreate() {
    const createPostModal = this.modalCtrl.create(PostCreateEditPage, { method: 'create', category: this.post_id});
    createPostModal.onDidDismiss( id => {
      console.log('Success:: ID:: ', id);
      // this.insert Post(id);
    });
    createPostModal.present();
  }

  // insertPost(post_ID) {
  //   this.a.forum.postData(post_ID).subscribe(post => {
  //     // console.log('this.posts:: ', this.pages);
  //
  //     if (!this.pages[0].posts) {
  //       this.pages[0]['posts'] = [];
  //     }
  //     this.a.forum.pre( post );
  //     this.pages[0].posts.unshift(post);
  //
  //   }, e => this.a.showError(e));
  // }


}
