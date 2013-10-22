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
	    if (authRequired) {
		this.setHeader('authorization', 'bearer ' + context.getAccessToken());
	    }
	}

	sendJson(json : any, callback : Kii.HttpClientCallback) {
	    this.prepareSend(callback);
	    this.client.send(JSON.stringify(json));
	}
	
	send(callback : Kii.HttpClientCallback) {
	    this.prepareSend(callback);
	    this.client.send();
	}

	private prepareSend(callback : Kii.HttpClientCallback) {
	    this.client.onload = (e : any) => {
		// create headers
		var responseHeader = {};
		if (this.client.status == 204) {
		    callback.onReceive(this.client.status,
				       responseHeader,
				       {});
		} else {
		    callback.onReceive(this.client.status,
				       responseHeader,
				       JSON.parse(this.client.responseText));
		}
	    };
	    this.client.onerror = (e : any) => {
		callback.onError(this.client.status, JSON.parse(this.client.responseText));
	    };
	    this.client.open(this.method, this.url);	    
	}
    }
}