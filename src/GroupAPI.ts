/// <reference path="AppAPI.ts"/>
/// <reference path="KiiUser.ts"/>
/// <reference path="KiiGroup.ts"/>
module Kii {
    export interface GroupAPI {
        create(name : string, owner : KiiUser,
	       members : Array<KiiUser>): KiiGroup;
	create(name : string, owner : KiiUser,
	       members : Array<KiiUser>, callback : GroupCallback);
               
        fetchGroup(id : string) : KiiGroup;
	fetchGroup(id : string, callback : GroupCallback);

	updateGroupName(group : KiiGroup, name : string) : KiiGroup;
	updateGroupName(group : KiiGroup, name : string, callback : GroupCallback);

        updateGroupOwner(group : KiiGroup, owner : KiiUser) : KiiGroup;
	updateGroupOwner(group : KiiGroup, owner : KiiUser, callback : GroupCallback);
	deleteGroup(group : KiiGroup);
	deleteGroup(group : KiiGroup, callback : KiiCallback);

        getJoinedGroups(user : KiiUser, callback) : Array<KiiGroup>;
	getJoinedGroups(user : KiiUser, callback : GroupListCallback);

        getOwnedGroups(user : KiiUser) : Array<KiiGroup>;
	getOwnedGroups(user : KiiUser, callback : GroupListCallback);

        addMember(group : KiiGroup, user : KiiUser) : KiiGroup;
	addMember(group : KiiGroup, user : KiiUser, callback : GroupCallback);

        removeMember(group : KiiGroup, user : KiiUser) : KiiGroup;
	removeMember(group : KiiGroup, user : KiiUser, callback : GroupCallback);
	fetchMembers(group : KiiGroup) : Array<KiiUser>;
	fetchMembers(group : KiiGroup, callback : UserListCallback);
    }
}