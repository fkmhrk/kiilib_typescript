/// <reference path="../AppApi.ts" />
/// <reference path="../KiiContext.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />

module Kii {
    export class KiiAppAPI implements AppAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
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
/*	    
	    if (resp.getStatus() != 200) {
			throw new CloudException(resp.getStatus(), resp.getAsJson());
		}
		respJson = resp.getAsJson();

		userId = respJson['id'];
		token = respJson['access_token'];
		c.setAccessToken(token);

		return new Kiiuser(userId);
*/		
	}
        // APIs
        userAPI() {}
        groupAPI() {}
        bucketAPI() {}
        objectAPI() {}
        aclAPI() {}
        topicAPI() {}      
    }
}