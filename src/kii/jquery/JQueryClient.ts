/// <reference path="../../HttpClient.ts" />
/// <reference path="../../HttpClientCallback.ts" />
var $ : any;
module jquery {
    export class JQueryClient implements Kii.HttpClient {
	private url : string;
	private method: string;
	private headers : any;

	constructor() {
	    this.headers = {};
	}
	
	setUrl(url : string) {
	    this.url = url;
	}

	setMethod(method : string) {
	    this.method = method;
	}
	  
	setContentType(value : string) {
	    this.setHeader('content-type', value);
	}

	setHeader(key : string, value : string) {
	    this.headers[key] = value;
	}

	setKiiHeader(context : Kii.KiiContext, authRequired : boolean) {
	    this.setHeader('x-kii-appid', context.getAppId());
	    this.setHeader('x-kii-appkey', context.getAppKey());
	    if (authRequired) {
		this.setHeader('authorization', 'bearer ' + context.getAccessToken());
	    }
	}

	sendText(text : string, callback : Kii.HttpClientCallback) {
	    var data = {
		url : this.url,
		type : this.method,
		headers : this.headers,
		dataType : 'json',
		scriptCharset: 'utf-8',
		data : text,
		processData : false
	    };
	    this.sendRequest(data, callback);
	}
	
	sendJson(json : any, callback : Kii.HttpClientCallback) {
	    this.sendText(JSON.stringify(json), callback);
	}

	send(callback : Kii.HttpClientCallback) {
	    var data = {
		url : this.url,
		type : this.method,
		headers : this.headers,
		dataType : 'json',
		scriptCharset: 'utf-8',
		processData : false
	    };
	    this.sendRequest(data, callback);	    
	}

	private sendRequest(data : any, callback : Kii.HttpClientCallback) {
	    $.ajax(data)
		.done(function(data_, status, data) {
		    if (data.status == 204) {
			callback.onReceive(data.status,
					   data.getAllResponseHeaders(),
					   {});
		    } else {
			callback.onReceive(data.status,
					   data.getAllResponseHeaders(),
					   JSON.parse(data.responseText));
		    }
		}).fail(function(data) {
                    if (data.status == 204) {
                        callback.onReceive(data.status,
					   data.getAllResponseHeaders(),
					   {});
                    } else {
		        callback.onError(data.status, data.responseText);
                    }
		});	    
	}
    }
}