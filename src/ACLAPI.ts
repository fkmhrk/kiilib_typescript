/// <reference path="AppAPI.ts"/>
module Kii {
    export interface ACLAPI {
	grant(target : any, verb : string, subject : any, callback : KiiCallback);
	revoke(target : any, verb : string, subject : any, callback : KiiCallback);
    }
}