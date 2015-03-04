/// <reference path="../../HttpClient.ts" />
/// <reference path="../../HttpClientCallback.ts" />
var UrlFetchApp : any;
module gas {
    export class GASClient implements Kii.HttpClient {
	private url : string;
	private method: string;
	private headers : any;
        private params : any;

	constructor() {
	    this.headers = {};
            this.params = {
                'headers' : this.headers
            };
	}
	
	setUrl(url : string) {
	    this.url = url;
	}

	setMethod(method : string) {
            this.params['method'] = method;
	}
	  
	setContentType(value : string) {
            this.params['contentType'] = value;
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
            this.params['payload'] = text;
	    this.sendRequest(callback);
	}
	
	sendJson(json : any, callback : Kii.HttpClientCallback) {
	    this.sendText(JSON.stringify(json), callback);
	}

	send(callback : Kii.HttpClientCallback) {
	    this.sendRequest(callback);	    
	}

	private sendRequest(callback : Kii.HttpClientCallback) {
            var result = UrlFetchApp.fetch(this.url, this.params);
            var status = result.getResponseCode();
            if (status == 204) {
                callback.onReceive(status, 
				   result.getHeaders(),
				   {});
            } else if (200 <= status && status < 300) {
                callback.onReceive(status,
				   result.getHeaders(),
				   JSON.parse(result.getContentText()));
            } else {
                callback.onError(status, result.getContentText());
            }
	}
    }
}