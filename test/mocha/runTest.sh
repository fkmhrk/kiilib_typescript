#!/bin/sh

mocha --reporter spec AppAPITest.js \
    UserAPITest.js \
    BucketAPITest.js \
    ACLAPITest.js
