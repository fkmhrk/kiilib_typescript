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

	create(name : string, owner : KiiUser,
	       members : Array<KiiUser>, callback : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		'/groups';
	    var idList = new Array();
	    members.forEach((item : KiiUser) => {
		idList.push(item.id);
	    });
	    var body = {
		'name' : name,
		'owner' : owner.id,
		'members' : idList
	    }

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setContentType('application/vnd.kii.GroupCreationRequest+json');
	    client.setKiiHeader(c, true);

	    client.sendJson(body, {
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var id = body['groupID'];
		    callback.success(new KiiGroup(id));
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}

	fetchGroup(id : string, callback : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		'/groups/' + id;

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('GET');
	    client.setKiiHeader(c, true);

	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var id = body['groupID'];
		    var name = body['name'];
		    var ownerId = body['owner'];
		    var group = new KiiGroup(id);
		    group.name = name;
		    group.owner = new KiiUser(ownerId);
		    callback.success(group);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}
	
	deleteGroup(group : KiiGroup, callback : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath();

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('DELETE');
	    client.setKiiHeader(c, true);

	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    callback.success();
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
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

	addMember(group : KiiGroup, user : KiiUser, callback : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/members/' + user.id;

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
	    client.setKiiHeader(c, true);

	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    group.members.push(user);
		    callback.success(group);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}
	
	removeMember(group : KiiGroup, user : KiiUser, callback : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/members/' + user.id;

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('DELETE');
	    client.setKiiHeader(c, true);

	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    group.removeMember(user);
		    callback.success(group);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}
	
	fetchMembers(group : KiiGroup, callback : UserListCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/members';

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('GET');
	    client.setKiiHeader(c, true);

	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var array = body['members'];
		    var list = new Array<KiiUser>();
		    array.forEach((item : any) => {
			var id = item['userID'];
			list.push(new KiiUser(id));
		    });
		    callback.success(list);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });	    
	}
    }
}
