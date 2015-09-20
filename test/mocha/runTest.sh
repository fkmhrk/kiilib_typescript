#!/bin/sh

mocha --reporter spec AppAPITest.js \
    UserAPITest.js \
    ACLAPITest.js
