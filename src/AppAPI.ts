/// <reference path="KiiUser.ts" />
/// <reference path="KiiObject.ts" />
/// <reference path="ObjectAPI.ts" />

module Kii {
    export interface AppAPI {
        login(userIdentifier : string, password : string, callback : UserCallback);
        loginAsAdmin(clientId : string, clientSecret : string, callback : UserCallback);

        // APIs
        userAPI();
        groupAPI();
        bucketAPI();
        objectAPI() : ObjectAPI;
        aclAPI();
        topicAPI();  
    }

    export interface KiiCallback {
	success : () => void;
	error : (status : number, body : any) => void;
    }
    
    export interface UserCallback {
	success : (user : KiiUser) => void;
	error : (status : number, body : any) => void;
    }

    export interface ObjectCallback {
	success : (obj : KiiObject) => void;
	error : (status : number, body : any) => void;
    }    
}