/// <reference path="../../HttpClient.ts" />
/// <reference path="../../HttpClientCallback.ts" />
declare var Ti : any;
module titanium {
    export class TitaniumClient implements Kii.HttpClient {
	private client : any;
	private url : string;
	private method: string;
	private headers : any;

	// for titanium
	private responseText : string;

	constructor() {
	    this.client = Ti.Network.createHTTPClient();
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
	    this.client.setRequestHeader(key, value);
	}

	setKiiHeader(context : Kii.KiiContext, authRequired : boolean) {
	    this.setHeader('x-kii-appid', context.getAppId());
	    this.setHeader('x-kii-appkey', context.getAppKey());
	}

	sendJson(json : any, callback : Kii.HttpClientCallback) {
	    this.client.onload = (e : any) => {
		// create headers
		var responseHeader = {};
		callback.onReceive(this.client.status,
				   responseHeader,
				   JSON.parse(this.client.responseText));
	    };
	    this.client.onerror = (e : any) => {
		alert(this.client.responseText);
	    };
	    this.client.open(this.method, this.url);
	    this.client.send(JSON.stringify(json));
/*	    
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
*/	    
	}
		   

	send() {}
    }
}