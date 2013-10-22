/// <reference path="AppAPI.ts"/>
/// <reference path="KiiUser.ts"/>
/// <reference path="KiiGroup.ts"/>
module Kii {
    export interface GroupAPI {
	getJoinedGroups(user : KiiUser, callback : GroupListCallback);

	getOwnedGroups(user : KiiUser, callback : GroupListCallback);
    }
}