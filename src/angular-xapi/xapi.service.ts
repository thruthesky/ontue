import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {DomSanitizer} from '@angular/platform-browser';

import { Base } from './base';



@Injectable()
export class XapiService extends Base {

  
    private serverUrl = '';


    constructor(
        private http: HttpClient,
        private zone: NgZone,
        private domSanitizer: DomSanitizer
    ) {
        super();
    }

    setServerUrl(url: string): void {
        this.serverUrl = url + '/wp-json/xapi/v2/do';
        console.log("serverUrl: ", this.serverUrl);
    }

    getServerUrl(): string {
        return this.serverUrl;
    }

    /**
     * Request to server through POST method.
     * @param data request data
     * 
     *      data['session_id'] - user session id
     *      data['route'] - route
     * 
     */
    post(data): Observable<any> {
        // console.log('url: ', this.serverUrl);
        return this.http.post(this.serverUrl, data)
            .map(e => this.checkResult(e, data))
    }

    query(req): Observable<any> {
        req['route'] = 'wordpress.wp_query';
        req['paged'] = req['paged'] ? req['paged'] : 1;
        return this.post(req);
    }

    /**
     * Gets a page
     * @param req request data
     * 
     * @code
     * a.xapi.page({ name: 'ontue.reminders' }).subscribe( re => this.reminders = re, e => a.alert(e.message));
     * @endcode
     */
    page(req) : any {
        req['route'] = 'wordpress.page';
        
        return this.post(req)
            .map( e => {
                const re = this.safe(e);
                this.render(500);  
                return re;      
             } );
    }




    checkResult(res, data) {
        // console.log("res: ", res);
        if (!res) {
            console.error("Response from backend is empty");
            console.log("Requested data(that cause empty response): ", data);
            this.throw(-4008, 'Response from backend is empty');
        }
        else if (res['code'] === void 0) this.throw(-4009, 'Response has no code');
        else if (res['code'] !== 0) {
            // console.log("WordPressApiService::checkResult => error : ", res);
            if ( res['message'] === void 0 ) res['message'] = 'no message';
            this.throw(res['code'], res['message']);
        }
        else return res['data'];
  }


  version() {
    // console.log("version: ");
    return this.post({route: 'wordpress.version'});
  }


  /**
   * .set() automatically JSON.stringify()
   * .get() automatically JSON.parse()
   *
   * @return .get() returns null if there is error or the value is falsy.
   *
   */
  get(key) {
    let value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      }
      catch (e) {
        return null;
      }
    }
    return null;
  }

  set(key, data) {
    // console.log("storage::set()", data);
    return localStorage.setItem(key, JSON.stringify(data));
  }


  /**
   * Returns true if the app is running as Cordova mobile app.
   */
  isCordova(): boolean {
    if (window['cordova']) return true;
    else return false;
  }

  isWeb(): boolean {
    if (document.URL.indexOf('http://') !== -1
      || document.URL.indexOf('https://') !== -1) return true;
    else return false;
  }


  
    render(timer = 10) {
        setTimeout(() => this.zone.run(() => {
            // console.log("zone ran.");
        }), timer);
    }


    safe( html: string ): any {
        return <any>this.domSanitizer.bypassSecurityTrustHtml(html);
    }


    
    
}



