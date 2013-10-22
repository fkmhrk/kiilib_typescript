/// <reference path="../KiiContext.ts" />
/// <reference path="../AppAPI.ts" />
/// <reference path="../KiiBucket.ts" />
/// <reference path="../KiiObject.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />
/// <reference path="../ObjectAPI.ts" />

module Kii {
    export class KiiObjectAPI implements ObjectAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

	create(bucket : KiiBucket, data : any, callback : ObjectCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		    '/apps/'+ c.getAppId() +
		    bucket.getPath() +
		    '/objects';

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setKiiHeader(c, true);
	    client.setContentType('application/json');

	    var resp = client.sendJson(data, {
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var id = body['objectID'];
		    callback.success(new KiiObject(bucket, id, data));
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}

	update(obj : KiiObject, callback : ObjectCallback) {
	}

	deleteObject(obj : KiiObject, callback : KiiCallback) {
	}
    }
}
