/// <reference path="KiiUser.ts" />

module Kii {
    export interface AppAPI {
        login(userIdentifier : string, password : string, callback : UserCallback);
        loginAsAdmin(clientId : string, clientSecret : string, callback : UserCallback);

        // APIs
        userAPI();
        groupAPI();
        bucketAPI();
        objectAPI();
        aclAPI();
        topicAPI();  
    }
    
    export interface UserCallback {
	success : (user : KiiUser) => void;
	error : (status : number, body : any) => void;
    }
}