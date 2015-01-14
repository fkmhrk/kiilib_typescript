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

	create(bucket : KiiBucket, data : any, callback? : ObjectCallback) {
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

            var respObject : KiiObject;
	    client.sendJson(data, {
	        onReceive : (status : number, headers : any, body : any) => {
                    var id = body['objectID'];
                    if (callback === undefined) {
                        respObject = new KiiObject(bucket, id, data);
                        return;
                    }
		    if (callback.success === undefined) { return; }
		    callback.success(new KiiObject(bucket, id, data));
		},
		onError : (status : number, body : any) => {
                    if (callback === undefined) {
                        throw new Error(body);
                        return;
                    }
		    if (callback.error === undefined) { return; }	    
		    callback.error(status, body);
		}		
	    });
            return respObject;
	}

	update(obj : KiiObject, callback? : ObjectCallback) {
            var c = this.context;
            var url = c.getServerUrl() +
		'/apps/' + c.getAppId() +
		obj.getPath();

            var client = c.getNewClient();
            client.setUrl(url);
            client.setMethod('PUT');
            client.setKiiHeader(c, true);
            client.setContentType('application/json');

            var respObject : KiiObject;
            client.sendJson(obj.data, {
		onReceive : (status : number, headers : any, body : any) => {
                    if (callback === undefined) {
                        respObject = obj;
                        return;
                    }
                    if (callback.success === undefined) { return; }
                    callback.success(obj);
                },
                onError : (status : number, body : any) => {
                    if (callback === undefined) {
                        throw new Error(body);
                        return;
                    }
                    if (callback.error === undefined) { return; }
                    callback.error(status, body);
                }
	    });
            return respObject;
	}

	deleteObject(obj : KiiObject, callback? : KiiCallback) {
            var c = this.context;
            var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		obj.getPath();

            var client = c.getNewClient();
            client.setUrl(url);
            client.setMethod('DELETE');
            client.setKiiHeader(c, true);

            client.send({
		onReceive : (status : number, headers : any, body : any) => {
                    if (callback === undefined) { return; }
                    if (callback.success === undefined) { return; }
                    callback.success();
                },
                onError : (status : number, body : any) => {
                    if (callback === undefined) {
                        throw new Error(body);
                        return;
                    }
                    if (callback.error === undefined) { return; }
                    callback.error(status, body);
                }		
	    });
	}
    }
}
