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
	       members : Array<KiiUser>, callback? : GroupCallback) {
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

            var respGroup : KiiGroup;
	    client.sendJson(body, {
	        onReceive : (status : number, headers : any, body : any) => {
                    var id = body['groupID'];
                    if (callback === undefined) {
                        respGroup = new KiiGroup(id);
                        return;
                    }
		    if (callback.success === undefined) { return; }
		    callback.success(new KiiGroup(id));
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
            return respGroup;
	}

	fetchGroup(id : string, callback? : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		'/groups/' + id;

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('GET');
	    client.setKiiHeader(c, true);

            var respGroup : KiiGroup;
	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    var id = body['groupID'];
		    var name = body['name'];
		    var ownerId = body['owner'];
		    var group = new KiiGroup(id);
		    group.name = name;
		    group.owner = new KiiUser(ownerId);
                    if (callback === undefined) {
                        respGroup = group;
                        return;
                    }
                    if (callback.success === undefined) { return; }
		    callback.success(group);
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
            return respGroup;
	}

	updateGroupName(group : KiiGroup, name : string, callback? : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/name';

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
	    client.setContentType('text/plain');
	    client.setKiiHeader(c, true);

            var respGroup : KiiGroup;
	    client.sendText(name, {
	        onReceive : (status : number, headers : any, body : any) => {
                    group.name = name;
                    if (callback === undefined) {
                        respGroup = group;
                        return;
                    }
		    if (callback.success === undefined) { return; }
		    callback.success(group);
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
            return respGroup;
	}

	updateGroupOwner(group : KiiGroup, owner : KiiUser, callback? : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/owner';
	    var body = {
		'owner' : owner.id
	    };

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
	    client.setContentType('application/vnd.kii.GroupOwnerChangeRequest+json');
	    client.setKiiHeader(c, true);

            var respGroup : KiiGroup;
	    client.sendJson(body, {
	        onReceive : (status : number, headers : any, body : any) => {
                    group.owner = owner;
                    if (callback === undefined) {
                        respGroup = group;
                        return;
                    }
		    if (callback.success === undefined) { return; }
		    callback.success(group);
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
            return respGroup;
	}
	
	deleteGroup(group : KiiGroup, callback? : KiiCallback) {
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
	
	getJoinedGroups(user : KiiUser, callback? : GroupListCallback) {
            return this.getGroups(user, 'is_member', callback);
	}

	getOwnedGroups(user : KiiUser, callback? : GroupListCallback) {
            return this.getGroups(user, 'owner', callback);	    
	}
	
	private getGroups(user : KiiUser, query : string, callback : GroupListCallback) : Array<KiiGroup> {
	    var c = this.context;
            var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		'/groups?'+ query + '='+ user.getId();

            var client = c.getNewClient();
            client.setUrl(url);
            client.setMethod('GET');
            client.setKiiHeader(c, true);

            var respArray : Array<KiiGroup>;
            client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    var respGroups = body['groups'];
		    var result = new Array<KiiGroup>();
		    respGroups.forEach((item : any) => {
			result.push(this.toKiiGroup(item));
		    });
                    if (callback === undefined) {
                        respArray = result;
                        return;
                    }
                    if (callback.success === undefined) { return; }
		    callback.success(result);
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
            return respArray;
	}

	private toKiiGroup(item : any) : KiiGroup {
            var id = item['groupID'];
            var name = item['name'];
            var ownerId = item['owner'];

	    var group = new KiiGroup(id);
	    group.name = name;
	    return group;
	}

	addMember(group : KiiGroup, user : KiiUser, callback? : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/members/' + user.id;

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
	    client.setKiiHeader(c, true);

            var respGroup : KiiGroup;
	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
                    group.members.push(user);
                    if (callback === undefined) {
                        respGroup = group;
                        return;
                    }
		    if (callback.success === undefined) { return; }
		    callback.success(group);
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
            return respGroup;
	}
	
	removeMember(group : KiiGroup, user : KiiUser, callback? : GroupCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/members/' + user.id;

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('DELETE');
	    client.setKiiHeader(c, true);

            var respGroup : KiiGroup;
	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
                    group.removeMember(user);
                    if (callback === undefined) {
                        respGroup = group;
                        return;
                    }
		    if (callback.success === undefined) { return; }
		    callback.success(group);
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
            return respGroup;
	}
	
	fetchMembers(group : KiiGroup, callback? : UserListCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		group.getPath() +
		'/members';

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('GET');
	    client.setKiiHeader(c, true);

            var respArray : Array<KiiUser>;
	    client.send({
	        onReceive : (status : number, headers : any, body : any) => {
		    var array = body['members'];
		    var list = new Array<KiiUser>();
		    array.forEach((item : any) => {
			var id = item['userID'];
			list.push(new KiiUser(id));
		    });
                    if (callback === undefined) {
                        respArray = list;
                        return;
                    }
                    if (callback.success === undefined) { return; }
		    callback.success(list);
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
            return respArray;
	}
    }
}
