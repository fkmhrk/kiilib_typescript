/// <reference path="KiiUser.ts" />
/// <reference path="KiiCondition.ts" />
/// <reference path="KiiObject.ts" />

/// <reference path="GroupAPI.ts" />
/// <reference path="BucketAPI.ts" />
/// <reference path="ObjectAPI.ts" />

module Kii {
    export interface AppAPI {
        login(userIdentifier : string, password : string, callback : UserCallback);
        loginAsAdmin(clientId : string, clientSecret : string, callback : UserCallback);

        // APIs
        userAPI();
        groupAPI() : GroupAPI;
        bucketAPI() : BucketAPI;
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