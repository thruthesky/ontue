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

        
        let q = this.http_build_query( data );
        console.log('xapi.service::post() url: ', this.serverUrl + '?' + q);
        
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
        // console.log("checkResult() => res: ", res, " data: ", data);
        if (!res) {
            console.error("Response from backend is empty");
            console.log("Requested data(that cause empty response): ", data);
            this.throw(-4008, 'Response from backend is empty');
        }
        else if (res['code'] === void 0) {
            console.log("=========> re: ", res);
            this.throw(-4009, 'Response has no code');
        }
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


    

    /**
     * 이 함수는 Http Query 를 만들 때 사용한다. 주로 테스트 할 때에만 필요하다. 테스트가 끝나면, 이 함수를 삭제해야 한다.
     * @param formdata 
     * @param numericPrefix 
     * @param argSeparator 
     */
    http_build_query(formdata, numericPrefix = '', argSeparator = '') {
        var urlencode = this.urlencode;
        var value
        var key
        var tmp = []
        var _httpBuildQueryHelper = function (key, val, argSeparator) {
            var k
            var tmp = []
            if (val === true) {
                val = '1'
            } else if (val === false) {
                val = '0'
            }
            if (val !== null) {
                if (typeof val === 'object') {
                    for (k in val) {
                        if (val[k] !== null) {
                            tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
                        }
                    }
                    return tmp.join(argSeparator)
                } else if (typeof val !== 'function') {
                    return urlencode(key) + '=' + urlencode(val)
                } else {
                    throw new Error('There was an error processing for http_build_query().')
                }
            } else {
                return ''
            }
        }

        if (!argSeparator) {
            argSeparator = '&'
        }
        for (key in formdata) {
            value = formdata[key]
            if (numericPrefix && !isNaN(key)) {
                key = String(numericPrefix) + key
            }
            var query = _httpBuildQueryHelper(key, value, argSeparator)
            if (query !== '') {
                tmp.push(query)
            }
        }

        return tmp.join(argSeparator)
    }


    urlencode(str) {
        str = (str + '')
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+')
    }



    
}



