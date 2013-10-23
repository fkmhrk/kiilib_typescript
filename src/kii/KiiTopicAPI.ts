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

	create(topic : KiiTopic, callback : KiiCallback) {
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