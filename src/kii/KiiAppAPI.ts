/// <reference path="../AppAPI.ts" />
/// <reference path="../ObjectAPI.ts" />
/// <reference path="../KiiContext.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />

/// <reference path="KiiGroupAPI.ts" />
/// <reference path="KiiBucketAPI.ts" />
/// <reference path="KiiObjectAPI.ts" />

module Kii {
    export class KiiAppAPI implements AppAPI {
        context : KiiContext;
	
	groupAPI_ : GroupAPI;
	bucketAPI_ : BucketAPI;
	objectAPI_ : ObjectAPI;
	aclAPI_ : ACLAPI;

	constructor(context : KiiContext) {
	    this.context = context;

	    this.groupAPI_ = new KiiGroupAPI(context);
	    this.bucketAPI_ = new KiiBucketAPI(context);
	    this.objectAPI_ = new KiiObjectAPI(context);
	    this.aclAPI_ = new KiiACLAPI(context);
	}
	
        login(userIdentifier : string, password : string, callback : UserCallback) {
            var body = {
                'username' : userIdentifier,
                'password' : password };
            this.execLogin(body, callback);
	}
	
        loginAsAdmin(clientId : string, clientSecret : string, callback : UserCallback) {
            var body = {
	        'client_id' : clientId,
	        'client_secret' : clientSecret };
	    this.execLogin(body, callback);
	}	

	private execLogin(body : any, callback : UserCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + '/oauth2/token';
		
	    var client : HttpClient = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setKiiHeader(c, false);
	    client.setContentType('application/json');

	    var resp = client.sendJson(body, {
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var accessToken = body['access_token'];
		    var id = body['id'];
		    this.context.setAccessToken(accessToken);
		    callback.success(new KiiUser(id));
		    
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}
	    });
	}

	signUp(info : any, password : string, callback : UserCallback) {
	    info['password'] = password;
	    
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() +
		'/apps/'+ c.getAppId() +
		'/users';
		
	    var client : HttpClient = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setKiiHeader(c, false);
	    client.setContentType('application/json');

	    var resp = client.sendJson(info, {
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    var id = body['userID'];
		    callback.success(new KiiUser(id));
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}
	    });	    
	}

	deleteUser(user : KiiUser, callback : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() +
		'/apps/'+ c.getAppId() +
		user.getPath();
		
	    var client : HttpClient = c.getNewClient();
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
	
        // APIs
        userAPI() {}
        groupAPI() : GroupAPI {
	    return this.groupAPI_;
	}
	
        bucketAPI() : BucketAPI{
	    return this.bucketAPI_;
	}
	
        objectAPI() : ObjectAPI {
	    return this.objectAPI_;
	}
	
        aclAPI() : ACLAPI{
	    return this.aclAPI_;
	}
	
        topicAPI() {}      
    }
}