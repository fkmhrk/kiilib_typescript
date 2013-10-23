/// <reference path="AppAPI.ts"/>
module Kii {
    export interface TopicAPI {
	create(topic : KiiTopic, callback : KiiCallback);
    }
}