/// <reference path="AppAPI.ts"/>
/// <reference path="KiiBucket.ts"/>
/// <reference path="QueryParams.ts"/>
module Kii {
    export interface BucketAPI {
	query(bucket : KiiBucket, params : QueryParams, callback : QueryCallback);
    }
}