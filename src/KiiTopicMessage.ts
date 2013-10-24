/// <reference path="KiiGCMMessage.ts"/>
/// <reference path="KiiAPNsMessage.ts"/>
module Kii {
    export class KiiTopicMessage {
	data : any;
	sendToDevelopment : boolean;
	sendToProduction : boolean;
	pushMessageType : string;
	sendAppID : boolean;
	sendSender : boolean;
	sendWhen : boolean;
	sendOrigin : boolean;
	sendObjectScope : boolean;
	sendTopicID : boolean;
	gcm : any;
	apns : any;

	constructor() {
            this.data = {};
            this.sendToDevelopment = true;
            this.sendToProduction = true;
            this.pushMessageType = '';
            this.sendAppID = false;
            this.sendSender = true;
            this.sendWhen = false;
            this.sendOrigin = false;
            this.sendObjectScope = true;
            this.sendTopicID = true;

            this.gcm = new KiiGCMMessage();
            this.apns = new KiiAPNsMessage();
	}

	setSendToDevelopment(value : boolean) {
            this.sendToDevelopment =value;
	}

	setSendToProduction(value : boolean) {
            this.sendToProduction = value;
	}

	setPushMessageType(value : string) {
            this.pushMessageType = value;
	}

	setSendAppID(value : boolean) {
            this.sendAppID =value;
	}

	setSendSender(value : boolean) {
            this.sendSender = value;

	}

	setSendWhen(value : boolean) {
            this.sendWhen = value;
	}
	setSSendOrigin(value : boolean) {
            this.sendOrigin = value;
	}

	setSendObjectScope(value : boolean) {
            this.sendObjectScope = value;
	}

	setSendTopicID(value : boolean) {
            this.sendTopicID = value;
	}

	toJson() {
            var json = {
                "sendToDevelopment" : this.sendToDevelopment,
                "sendToProduction" : this.sendToProduction,
                "pushMessageType" : this.pushMessageType,
                "sendAppID" : this.sendAppID,
                "sendSender" : this.sendSender,
                "sendWhen" : this.sendWhen,
                "sendOrigin" : this.sendOrigin,
                "sendObjectScope" : this.sendObjectScope,
                "sendTopicID" : this.sendTopicID,

                "gcm" : this.gcm.toJson(),
                "apns" : this.apns.toJson()
            };
            if (Object.keys(this.data).length > 0) {
		json['data'] = this.data;
            }
            return json;
	}	
    }
}