/// <reference path="AppAPI.ts"/>
/// <reference path="KiiBucket.ts"/>
module Kii {
    export interface ObjectAPI {
        create(bucket : KiiBucket, data : any) : KiiObject;
	create(bucket : KiiBucket, data : any, callback : ObjectCallback);

        update(obj : KiiObject) : KiiObject;
	update(obj : KiiObject, callback : ObjectCallback);

        deleteObject(obj : KiiObject);
	deleteObject(obj : KiiObject, callback : KiiCallback);
    }
}