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

	changePassword(user : KiiUser, current : string,
		       newPassword : string, callback : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		user.getPath() +
		'/password';
	    var body = {
		'oldPassword' : current,
		'newPassword' : newPassword
	    }

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
	    client.setContentType('application/vnd.kii.ChangePasswordRequest+json');
	    client.setKiiHeader(c, true);

	    client.sendJson(body, {
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

	resetPassword(user : KiiUser, callback : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		user.getPath() +
		'/password/reset';
	    
	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
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
	
	update(user : KiiUser, callback : UserCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		user.getPath();

	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setContentType('application/vnd.kii.UserUpdateRequest+json');
	    client.setKiiHeader(c, true);

	    client.sendJson(user.data, {
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    callback.success(user);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}

	updateEmail(user : KiiUser, email : string, verified : boolean,
		    callback : UserCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		user.getPath() +
		'/email-address';
	    var body = {
		'emailAddress'  : email
	    };
	    if (verified) {
		body['verified'] = true;
	    }
	    
	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
	    client.setContentType('application/vnd.kii.EmailAddressModificationRequest+json');
	    client.setKiiHeader(c, true);

	    client.sendJson(body, {
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    user.data['emailAddress'] = email;
		    if (verified) {
			user.data['emailAddressVerified'] = true;
		    }
		    callback.success(user);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}

	updatePhone(user : KiiUser, phone : string,
		    verified : boolean, callback : UserCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		user.getPath() +
		'/phone-number';
	    var body = {
		'phoneNumber'  : phone
	    };
	    if (verified) {
		body['verified'] = true;
	    }
	    
	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
	    client.setContentType('application/vnd.kii.PhoneNumberModificationRequest+json');
	    client.setKiiHeader(c, true);

	    client.sendJson(body, {
	        onReceive : (status : number, headers : any, body : any) => {
		    if (callback.success === undefined) { return; }
		    user.data['phoneNumber'] = phone;
		    if (verified) {
			user.data['phoneNumberVerified'] = true;
		    }
		    callback.success(user);
		},
		onError : (status : number, body : any) => {
		    if (callback.error === undefined) { return; }		    
		    callback.error(status, body);
		}		
	    });
	}

	subscribe(user : KiiUser, target : any, callback : KiiCallback) {
	    var targetPath = target.getPath();
	    if (targetPath.lastIndexOf('/buckets', 0) == 0) {
		targetPath += '/filters/all';
	    }
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		targetPath + 
		'/push/subscriptions' +
		user.getPath();
	    
	    var client = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
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

	unsubscribe(user : KiiUser, target : any, callback : KiiCallback) {
	    var targetPath = target.getPath();
	    if (targetPath.lastIndexOf('/buckets', 0) == 0) {
		targetPath += '/filters/all';
	    }
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		targetPath + 
		'/push/subscriptions' +
		user.getPath();
	    
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
    }
}