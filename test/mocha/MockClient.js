///<reference path="../../bin/KiiLib.d.ts"/>
var kii = require('../../bin/KiiLib-jquery.js');
var MockClient = (function () {
    function MockClient() {
        this.header = {};
    }
    MockClient.prototype.setUrl = function (url) {
        this.url = url;
    };
    MockClient.prototype.setMethod = function (method) {
        this.method = method;
    };
    MockClient.prototype.setContentType = function (value) {
        this.contentType = value;
    };
    MockClient.prototype.setHeader = function (key, value) {
        this.header[key] = value;
    };
    MockClient.prototype.setKiiHeader = function (context, authRequired) {
        this.setHeader('x-kii-appid', context.getAppId());
        this.setHeader('x-kii-appkey', context.getAppKey());
        if (authRequired) {
            this.setHeader('authorization', 'bearer ' + context.getAccessToken());
        }
    };
    MockClient.prototype.sendText = function (text, callback) {
        this.bodyText = text;
        callback.onReceive(this.respStatus, this.respHeader, this.respBody);
    };
    MockClient.prototype.sendJson = function (json, callback) {
        this.bodyJson = json;
        callback.onReceive(this.respStatus, this.respHeader, this.respBody);
    };
    MockClient.prototype.send = function (callback) {
        callback.onReceive(this.respStatus, this.respHeader, this.respBody);
    };
    return MockClient;
})();
var client;
function newContext() {
    var c = new kii.KiiContext('AppID', 'AppKey', 'https://api-jp.kii.com/api');
    client = new MockClient();
    c.setClientFactory(function () {
        return client;
    });
    return c;
}
var M = function () { };
M.prototype.newContext = newContext;
if (typeof module != 'undefined' && module.exports) {
    module.exports = new M();
}
