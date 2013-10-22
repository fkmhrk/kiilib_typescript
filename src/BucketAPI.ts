/// <reference path="AppAPI.ts"/>
/// <reference path="KiiBucket.ts"/>
/// <reference path="KiiCondition.ts"/>
module Kii {
    export interface BucketAPI {
	query(bucket : KiiBucket, condition : KiiCondition, callback : QueryCallback);
    }
}