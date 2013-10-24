/// <reference path="AppAPI.ts" />
/// <reference path="KiiUser.ts" />

module Kii {
    export interface UserAPI {
	fetchUser(id : string, callback : UserCallback);

	update(user : KiiUser, callback : UserCallback);
    }
}