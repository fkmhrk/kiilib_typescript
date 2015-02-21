/// <reference path="../AppAPI.ts" />
/// <reference path="../ObjectAPI.ts" />
/// <reference path="../KiiContext.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />

/// <reference path="KiiUserAPI.ts" />
/// <reference path="KiiGroupAPI.ts" />
/// <reference path="KiiBucketAPI.ts" />
/// <reference path="KiiObjectAPI.ts" />
/// <reference path="KiiTopicAPI.ts" />
/// <reference path="KiiACLAPI.ts" />

module Kii {
    export class KiiAppAPI implements AppAPI {
        context : KiiContext;

	userAPI_ : UserAPI;
	groupAPI_ : GroupAPI;
	bucketAPI_ : BucketAPI;
	objectAPI_ : ObjectAPI;
	aclAPI_ : ACLAPI;
	topicAPI_ : TopicAPI;

	constructor(context : KiiContext) {
	    this.context = context;

	    this.userAPI_ = new KiiUserAPI(context);
	    this.groupAPI_ = new KiiGroupAPI(context);
	    this.bucketAPI_ = new KiiBucketAPI(context);
	    this.objectAPI_ = new KiiObjectAPI(context);
	    this.aclAPI_ = new KiiACLAPI(context);
	    this.topicAPI_ = new KiiTopicAPI(context);
	}
	
        login(userIdentifier : string, password : string, callback? : UserCallback) {
            var body = {
                'username' : userIdentifier,
                'password' : password };
            if (callback === undefined) {
                return this.execLogin(body);
            } else {
                this.execLogin(body, callback);
            }
	}

        loginWithLocalPhone(phone : string, country : string, password : string, callback? : UserCallback) {	
            var body = {
                'username' : 'PHONE:' + country + '-' + phone,
                'password' : password };
            if (callback === undefined) {
                return this.execLogin(body);
            } else {
                this.execLogin(body, callback);
            }
	}	
	
        loginAsAdmin(clientId : string, clientSecret : string, callback? : UserCallback) {
            var body = {
	        'client_id' : clientId,
	        'client_secret' : clientSecret };
            if (callback === undefined) {
                return this.execLogin(body);
            } else {
	        this.execLogin(body, callback);
            }
	}	

	private execLogin(body : any, callback? : UserCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + '/oauth2/token';
		
	    var client : HttpClient = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setKiiHeader(c, false);
	    client.setContentType('application/json');

            var respUser : KiiUser;
	    var resp = client.sendJson(body, {
	        onReceive : (status : number, headers : any, body : any) => {
		    var accessToken = body['access_token'];
		    var id = body['id'];
		    this.context.setAccessToken(accessToken);
                    if (callback === undefined) {
                        respUser = new KiiUser(id);
                        return;
                    }
                    if (callback.success === undefined) { return; }
		    callback.success(new KiiUser(id));
		    
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
            return respUser;
	}

	signUp(info : any, password : string, callback? : UserCallback) {
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

            var respUser : KiiUser;
	    var resp = client.sendJson(info, {
	        onReceive : (status : number, headers : any, body : any) => {
		    var id = body['userID'];
                    if (callback === undefined) {
                        respUser = new KiiUser(id);
                        return;
                    }
                    if (callback.success === undefined) { return; }
		    callback.success(new KiiUser(id));
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
            return respUser;
	}

	deleteUser(user : KiiUser, callback? : KiiCallback) {
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

	sendEvent(event : KiiEvent, callback? : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() +
		'/apps/'+ c.getAppId() +
		'/events';
	    event.data['_deviceID'] = c.getDeviceId();
	    event.data['_uploadedAt'] = new Date().getTime();
		
	    var client : HttpClient = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setContentType('application/vnd.kii.Event+json');
	    client.setKiiHeader(c, false);

	    client.sendJson(event.data, {
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
	
        // APIs
        userAPI() : UserAPI {
	    return this.userAPI_;
	}
	
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
	
        topicAPI() : TopicAPI {
	    return this.topicAPI_;
	}
    }
}