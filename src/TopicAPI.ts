/// <reference path="AppAPI.ts"/>
/// <reference path="KiiTopicMessage.ts"/>
module Kii {
    export interface TopicAPI {
        create(topic : KiiTopic);
	create(topic : KiiTopic, callback : KiiCallback);

        sendMessage(topic : KiiTopic, message : KiiTopicMessage);
	sendMessage(topic : KiiTopic, message : KiiTopicMessage, callback : KiiCallback);
    }
}