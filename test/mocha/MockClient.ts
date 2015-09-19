///<reference path="../../bin/KiiLib.d.ts"/>
declare var module;
declare function require(name : string) : any;

var kii = require('../../bin/KiiLib-jquery.js');

class MockClient implements Kii.HttpClient {

    url : string;
    method : string;
    contentType : string;
    header : any;
    bodyText : string;
    bodyJson : any;

    respStatus : number;
    respHeader : any;
    respBody : any;

    constructor() {
        this.header = {};
    }
    
    setUrl(url : string) {
        this.url = url;
    }

    setMethod(method : string) {
        this.method = method;
    }
    
    setContentType(value : string) {
        this.contentType = value;
    }
    
    setHeader(key : string, value : string) {
        this.header[key] = value;
    }
    
    setKiiHeader(context : Kii.KiiContext, authRequired : boolean) {
	this.setHeader('x-kii-appid', context.getAppId());
	this.setHeader('x-kii-appkey', context.getAppKey());
	if (authRequired) {
	    this.setHeader('authorization', 'bearer ' + context.getAccessToken());
	}
    }
    
    sendText(text : string, callback : Kii.HttpClientCallback) {
        this.bodyText = text;
        callback.onReceive(this.respStatus, this.respHeader, this.respBody);
    }
    
    sendJson(json : any, callback : Kii.HttpClientCallback) {
        this.bodyJson = json;
        callback.onReceive(this.respStatus, this.respHeader, this.respBody);
    }
    
    send(callback : Kii.HttpClientCallback) {
        callback.onReceive(this.respStatus, this.respHeader, this.respBody);
    }
}

var client : MockClient;

function newContext() : Kii.KiiContext {
    var c : Kii.KiiContext = new kii.KiiContext('AppID', 'AppKey', 'https://api-jp.kii.com/api');
    client = new MockClient();
    c.setClientFactory(() => {
        return client;
    });
    return c;
}

var M = function(){};
M.prototype.newContext = newContext;

if (typeof module != 'undefined' && module.exports) {
    module.exports = new M();
}