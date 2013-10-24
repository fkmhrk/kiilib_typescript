/// <reference path="../KiiContext.ts" />
/// <reference path="../AppAPI.ts" />
/// <reference path="../KiiUser.ts"/>
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />
/// <reference path="../UserAPI.ts" />

module Kii {
    export class KiiUserAPI implements UserAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

	fetchUser(id : string, callback : UserCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		'/users/' + id;

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('GET');
	    client.setKiiHeader(c, true);

	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var user = new KiiUser(id);
		    user.data = body;
		    callback.success(user);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });	    
	}
    }
}