/// <reference path="../KiiContext.ts" />
/// <reference path="../KiiTopic.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />
/// <reference path="../TopicAPI.ts" />

module Kii {
    export class KiiTopicAPI implements TopicAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

	create(topic : KiiTopic, callback? : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() +
		'/apps/'+ c.getAppId() +
		topic.getPath();
		
	    var client : HttpClient = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('PUT');
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

	sendMessage(topic : KiiTopic, message : KiiTopicMessage, callback? : KiiCallback) {
	    var c : KiiContext = this.context;
	    var url = c.getServerUrl() +
		'/apps/'+ c.getAppId() +
		topic.getPath() +
		'/push/messages';
		
	    var client : HttpClient = c.getNewClient();
	    client.setUrl(url);
	    client.setMethod('POST');
	    client.setContentType('application/vnd.kii.SendPushMessageRequest+json');
	    client.setKiiHeader(c, true);

	    client.sendJson(message.toJson(), {
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