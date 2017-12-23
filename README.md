# ONTUE Development

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



# RUN

* Refer [OnTue Buildguide](https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.p0dmivnwef0t) for details.

* How to serve with LAB
````
$ npm run serve --lab -l -c
````

* How to serve (with livereload) in iOS.
````
$ ionic cordova run ios -l
$ cordova run ios --list
$ ionic cordova run -l ios --target "iPhone-7"
$ ionic cordova emulate -l ios --target "iPhone-SE"
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

# Publish

## PWA

````
$ npm run publish
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


## Schedule Table
