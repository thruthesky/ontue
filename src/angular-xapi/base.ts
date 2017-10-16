
import {Observable} from 'rxjs/Observable';

import * as I from './interfaces';

export const ERROR = {
    /// client error.
    /// errors that may occur only in client begin with -800xxxx
    LOGIN_FIRST: -80005,
    EMPTY: -80010,
    NO_CODE: -80011,
    RESPONSE_EMPTY: -80021,
    RESPONSE_NO_CODE: -80031,
    USER_LOGIN_RESPONSE_HAS_NO_SESSION_ID: -80041,
    CODE_PERMISSION_DENIED_NOT_OWNER: -80201,

    CHAT_ROOM_PATH: -80091,
    WRONG_PATH: -80060
};

export class Base {

    ERROR = ERROR;
    constructor() {

    }

    /**
     * Returns an Error object with JSON.stringify(code, message)
     * @param code error code
     * @param message error message
     */
    error(code, message?): Error {
        if (!message) message = '';
        const e = { code: code, message: message };
        return new Error( JSON.stringify(e) );
    }

    /**
     * Returns an I.ERROR_RESPONSE object from an Error Object.
     * @param e error object
     */
    getError( e: Error ): I.ERROR_RESPONSE {
        return JSON.parse( e.message );
    }


    /**
     * To throw an error or To return an Observable error.
     * 
     * @param code error code
     * @param message error message
     * @param obj if true, it returns Observable.throw(). if false, throws an error.
     */
    throw( code, message?, obj=false ): any {
        if ( obj ) {
            return Observable.throw( this.error( code, message) );
        }
        else throw( this.error( code, message) );
    }


}