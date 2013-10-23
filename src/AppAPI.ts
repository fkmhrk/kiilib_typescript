/// <reference path="KiiUser.ts" />
/// <reference path="KiiCondition.ts" />
/// <reference path="KiiObject.ts" />

/// <reference path="GroupAPI.ts" />
/// <reference path="BucketAPI.ts" />
/// <reference path="ObjectAPI.ts" />
/// <reference path="ACLAPI.ts" />
/// <reference path="TopicAPI.ts" />

module Kii {
    export interface AppAPI {
        login(userIdentifier : string, password : string, callback : UserCallback);
        loginAsAdmin(clientId : string, clientSecret : string, callback : UserCallback);

	signUp(info : any, password : string, callback : UserCallback);

	deleteUser(user : KiiUser, callback : KiiCallback);

        // APIs
        userAPI();
        groupAPI() : GroupAPI;
        bucketAPI() : BucketAPI;
        objectAPI() : ObjectAPI;
        aclAPI() : ACLAPI;
        topicAPI() : TopicAPI;  
    }

    export interface KiiCallback {
	success : () => void;
	error : (status : number, body : any) => void;
    }
    
    export interface UserCallback {
	success : (user : KiiUser) => void;
	error : (status : number, body : any) => void;
    }

    export interface GroupListCallback {
	success : (list : Array<KiiGroup>) => void;
	error : (status : number, body : any) => void;
    }    

    export interface QueryCallback {
	success : (result : Array<KiiObject>, condition : KiiCondition) => void;
	error : (status : number, body : any) => void;
    }
    
    export interface ObjectCallback {
	success : (obj : KiiObject) => void;
	error : (status : number, body : any) => void;
    }    
}