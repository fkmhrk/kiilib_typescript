/// <reference path="AppAPI.ts"/>
/// <reference path="KiiUser.ts"/>
/// <reference path="KiiGroup.ts"/>
module Kii {
    export interface GroupAPI {
	create(name : string, owner : KiiUser,
	       members : Array<KiiUser>, callback : GroupCallback);

	fetchGroup(id : string, callback : GroupCallback);
	
	updateGroupName(group : KiiGroup, name : string, callback : GroupCallback);

	updateGroupOwner(group : KiiGroup, owner : KiiUser, callback : GroupCallback);

	deleteGroup(group : KiiGroup, callback : KiiCallback);
	
	getJoinedGroups(user : KiiUser, callback : GroupListCallback);

	getOwnedGroups(user : KiiUser, callback : GroupListCallback);

	addMember(group : KiiGroup, user : KiiUser, callback : GroupCallback);

	removeMember(group : KiiGroup, user : KiiUser, callback : GroupCallback);

	fetchMembers(group : KiiGroup, callback : UserListCallback);
    }
}