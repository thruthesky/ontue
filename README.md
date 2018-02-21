# ONTUE Development

# ITS (issue.sh) (https://github.com/marketplace/issue-sh)
https://github.com/thruthesky/ontue/issues#issue-sh-boards


# Environment

* How to get ionic info
````
$ ionic info
````

## Repository
* It uses github and ionic repo.
* How to get repository info
````
$ git remove -v
````

# Modules

````
$ ionic cordova plugin add cordova-plugin-fcm
````




# RUN

* Refer [OnTue Buildguide](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.p0dmivnwef0t) for details.

* How to serve
````
$ s
$ ionic serve
````

* If you want to build PWA, then use it.
````
$ pwa
````
* How to serve with LAB
````
$ npm run serve --lab -l -c
````

* How to serve (with livereload) in iOS.
````
$ cordova run android --list
$ ionic cordova run android -l
$ ionic cordova run android --prod
$ ionic cordova run ios -l
$ cordova run ios --list
$ ionic cordova run -l ios --target "iPhone-7"
$ ionic cordova emulate -l ios --target "iPhone-SE"
$  ionic cordova run android --livereload --address=192.168.0.2 // [MACBOOK_INTERAL_ADDRESS]
````


# TODO

* Convert OLD OnTue teachers and Student to new OnTue.
  ** In that way, we can really show that we are not just a starter. We have a plenty of experience.

* Display no of teachers and no of student.
* Display teachers who are avaible for booking at this time.
* Customize text by domain.
  ** you can test on localhost:8100, work.org:8100, local.philgo.com:8100
````



````

# Test

* Test localhost. You can put the backendUrl in app.service.ts to remote to test.

````
$ node dist/test.js --server=localhost
````


* Test remote site

````
$ node dist/test.js
````



* Development
````
$ git checkout -b test
$ cd unit-teset
$ npm i
$ tsc
$ npm run test
$ git checkout master
````

# Publish


## Cordova App

* @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.b6m5q8dofizh


## PWA

* @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.7vrrgftj1org

````
$ p
$ npm run publish:all
````


#known Error

## Mobile Server Connection Error

* Within 5secs if the app didnt load yet then the app will try to access the server.
* This will result as server connection issue since it wasnt able to connect to server
* Adding the following code in config.xml may solve the problem

````
    <preference name="loadUrlTimeoutValue" value="700000" />
````



# Plans

https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.vn0askfhtlhr


# Developer's Documents


https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.76o0ywn0q7eg

## Design & Layout

https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.84vq694dis52

## Warning

* Example 1
````
  <div class="warning-box">
    앗! 로그인을 해야지만 예약을 할 수 있습니다.
  </div>
````
* Example 2
````
      <div class="warning-box text-md-left">
        <span class="pr-2"><i class="fas fa-exclamation-triangle"></i></span>
        앗! 로그인을 해야지만 예약을 할 수 있습니다.
      </div>
````

## Schedule Table

### Schedule Table Menu
https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.e9dgvd5lyd72


## Page Service and Page Page

* How to load a page from backend and display it as a component(directive).
* How to load a page from backend and display it as a page.


## CSS Tips

`.resize-on-break-point` will run resize the width to centeralize on break point.
