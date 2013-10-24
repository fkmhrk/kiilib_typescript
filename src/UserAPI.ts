/// <reference path="AppAPI.ts" />
/// <reference path="KiiUser.ts" />

module Kii {
    export interface UserAPI {
	fetchUser(id : string, callback : UserCallback);

	update(user : KiiUser, callback : UserCallback);

	changePassword(user : KiiUser, current : string, newPassword : string,
		    callback : KiiCallback);
	
	resetPassword(user : KiiUser, callback : KiiCallback);
	
	updateEmail(user : KiiUser, email : string, verified : boolean,
		    callback : UserCallback);
	
	updatePhone(user : KiiUser, phone : string, verified : boolean,
		    callback : UserCallback);	
    }
}