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
	}

	sendJson(json : any, callback : Kii.HttpClientCallback) {
	    $.ajax({
		url : this.url,
		type : this.method,
		headers : this.headers,
		dataType : 'json',
		scriptCharset: 'utf-8',
		data : JSON.stringify(json),
		processData : false
	    }).done(function(data_, status, data){
		callback.onReceive(data.status,
				   data.getAllResponseHeaders(),
				   JSON.parse(data.responseText));
	    }).fail(function(data){
		console.log("fail");		
		console.log("status:" + data.status);
		console.log("statusText:" + data.statusText);
		console.log("body:" + data.responseText);		
	    });
	}
		   

	send() {}
    }
}