/// <reference path="../KiiContext.ts" />
/// <reference path="../AppAPI.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />
/// <reference path="../GroupAPI.ts" />

module Kii {
    export class KiiGroupAPI implements GroupAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

	getJoinedGroups(user : KiiUser, callback : GroupListCallback) {
            return this.getGroups(user, 'is_member', callback);
	}

	getOwnedGroups(user : KiiUser, callback : GroupListCallback) {
            return this.getGroups(user, 'owner', callback);	    
	}
	
	private getGroups(user : KiiUser, query : string, callback : GroupListCallback) {
	    var c = this.context;
            var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		'/groups?'+ query + '='+ user.getId();

            var client = c.getNewClient();
            client.setUrl(url);
            client.setMethod('GET');
            client.setKiiHeader(c, true);

            client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var respGroups = body['groups'];
		    var result = new Array<KiiGroup>();
		    respGroups.forEach((item : any) => {
			result.push(this.toKiiGroup(item));
		    });
		    callback.success(result);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}

	private toKiiGroup(item : any) : KiiGroup {
            var id = item['groupID'];
            var name = item['name'];
            var ownerId = item['owner'];

	    var group = new KiiGroup(id);
	    group.name = name;
	    return group;
	}
    }
}