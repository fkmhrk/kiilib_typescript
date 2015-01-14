/// <reference path="AppAPI.ts" />
/// <reference path="KiiUser.ts" />

module Kii {
    export interface UserAPI {
        fetchUser(id : string) : KiiUser;
	fetchUser(id : string, callback : UserCallback);

        update(user : KiiUser) : KiiUser;
	update(user : KiiUser, callback : UserCallback);

        changePassword(user : KiiUser, current : string, newPassword : string);
	changePassword(user : KiiUser, current : string, newPassword : string,
		    callback : KiiCallback);

        resetPassword(user : KiiUser);
	resetPassword(user : KiiUser, callback : KiiCallback);

        updateEmail(user : KiiUser, email : string, verified : boolean) : KiiUser;
	updateEmail(user : KiiUser, email : string, verified : boolean,
		    callback : UserCallback);

        updatePhone(user : KiiUser, phone : string, verified : boolean) : KiiUser;
	updatePhone(user : KiiUser, phone : string, verified : boolean,
		    callback : UserCallback);

        verifyPhone(user : KiiUser, code : string) : KiiUser;
	verifyPhone(user : KiiUser, code : string, callback : UserCallback);

        subscribe(user : KiiUser, target : any);
	subscribe(user : KiiUser, target : any, callback : KiiCallback);

        unsubscribe(user : KiiUser, target : any);
	unsubscribe(user : KiiUser, target : any, callback : KiiCallback);
    }
}