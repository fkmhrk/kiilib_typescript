/// <reference path="KiiUser.ts" />
/// <reference path="KiiThing.ts" />
/// <reference path="KiiTopic.ts" />
/// <reference path="QueryParams.ts" />
/// <reference path="KiiObject.ts" />
/// <reference path="UserAPI.ts" />
/// <reference path="GroupAPI.ts" />
/// <reference path="BucketAPI.ts" />
/// <reference path="ObjectAPI.ts" />
/// <reference path="ACLAPI.ts" />
/// <reference path="TopicAPI.ts" />
/// <reference path="KiiEvent.ts" />

module Kii {
    export interface AppAPI {
        login(userIdentifier : string, password : string) : KiiUser ;
        login(userIdentifier : string, password : string, callback : UserCallback);
        loginWithLocalPhone(phone : string, country : string, password : string) : KiiUser;        
        loginWithLocalPhone(phone : string, country : string, password : string, callback : UserCallback);

        loginAsAdmin(clientId : string, clientSecret : string) : KiiUser;
        loginAsAdmin(clientId : string, clientSecret : string, callback : UserCallback);

        signUp(info : any, password : string) : KiiUser;
	signUp(info : any, password : string, callback : UserCallback);

        deleteUser(user : KiiUser);
	deleteUser(user : KiiUser, callback : KiiCallback);

        sendEvent(event : KiiEvent);
	sendEvent(event : KiiEvent, callback : KiiCallback);

        // APIs
        userAPI() : UserAPI;
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

    export interface UserListCallback {
	success : (list : Array<KiiUser>) => void;
	error : (status : number, body : any) => void;
    }    

    export interface GroupCallback {
	success : (group : KiiGroup) => void;
	error : (status : number, body : any) => void;
    }    

    export interface GroupListCallback {
	success : (list : Array<KiiGroup>) => void;
	error : (status : number, body : any) => void;
    }    

    export interface QueryCallback {
	success : (result : Array<KiiObject>, params : QueryParams) => void;
	error : (status : number, body : any) => void;
    }
    
    export interface ObjectCallback {
	success : (obj : KiiObject) => void;
	error : (status : number, body : any) => void;
    }    
}