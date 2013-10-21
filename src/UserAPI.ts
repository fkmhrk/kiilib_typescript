/// <reference path="KiiUser.ts" />

module Kii {
    enum OS {
        OS_ANDROID = 1,
        OS_IOS = 2
    }
    interface UserAPI {
	getUser(user : KiiUser);

	findByUsername(username : string);

	findByEmail(email : string);

	findByPhone(phone : string);

	installDevice(user : KiiUser, os : OS, token : string, development : boolean);

	subscribe(user : KiiUser, target : any);
    }
}