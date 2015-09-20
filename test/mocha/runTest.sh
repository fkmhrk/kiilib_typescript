#!/bin/sh

mocha --reporter spec AppAPITest.js \
    UserAPITest.js \
    BucketAPITest.js \
    ObjectAPITest.js \
    ACLAPITest.js
