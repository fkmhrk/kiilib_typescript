/// <reference path="../KiiContext.ts" />
/// <reference path="../AppAPI.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />
/// <reference path="../ACLAPI.ts" />

module Kii {
    export class KiiACLAPI implements ACLAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

	grant(target : any, verb : string, subject : any, callback? : KiiCallback) {
	    this.exec('PUT', target, verb, subject, callback);
	}
	
	revoke(target : any, verb : string, subject : any, callback? : KiiCallback) {
	    this.exec('DELETE', target, verb, subject, callback);	    
	}

	private exec(method : string, target : any,
		     verb : string, subject : any, callback : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() +
		'/apps/'+ c.getAppId() +
		target.getPath() +
		'/acl/' + verb + 
		'/' + subject.getSubject();
		
	    var client : HttpClient = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod(method);
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
