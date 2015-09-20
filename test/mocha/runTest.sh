#!/bin/sh

mocha --reporter spec AppAPITest.js \
    UserAPITest.js \
    GroupAPITest.js \
    BucketAPITest.js \
    ObjectAPITest.js \
    ACLAPITest.js
