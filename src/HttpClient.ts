/// <reference path="KiiContext.ts"/>
/// <reference path="HttpClientCallback.ts"/>

module Kii {
    export interface HttpClient {
	setUrl(url : string);

	setMethod(method : string);
	  
	setContentType(value : string);

	setHeader(key : string, value : string);

	setKiiHeader(context : KiiContext, authRequired : boolean);

	sendJson(json : any, callback : HttpClientCallback);

	send();

    }
}