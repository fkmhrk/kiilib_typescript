/// <reference path="../KiiContext.ts" />
/// <reference path="../AppAPI.ts" />
/// <reference path="../KiiBucket.ts" />
/// <reference path="../QueryParams.ts" />
/// <reference path="../KiiObject.ts" />
/// <reference path="../HttpClient.ts" />
/// <reference path="../HttpClientCallback.ts" />
/// <reference path="../BucketAPI.ts" />

module Kii {
    export class KiiBucketAPI implements BucketAPI {
        context : KiiContext;

	constructor(context : KiiContext) {
	    this.context = context;
        }

	query(bucket : KiiBucket, params : QueryParams, callback? : QueryCallback) {
            var c = this.context;
            var url = c.getServerUrl() + 
		'/apps/'+ c.getAppId() +
		bucket.getPath() +
		'/query';

            var client = c.getNewClient();
            client.setUrl(url);
            client.setMethod('POST');
            client.setKiiHeader(c, true);
            client.setContentType('application/vnd.kii.QueryRequest+json');

            var resp : QueryResult;
            client.sendJson(params.toJson(), {
		onReceive : (status : number, headers : any, body : any) => {
		    var nextPaginationKey = body['nextPaginationKey'];
		    params.setPaginationKey(nextPaginationKey);
		    
		    var respArray = body['results'];
		    var result = new Array<KiiObject>();
		    for (var i = 0 ; i < respArray.length ; ++i) {
			var item = respArray[i];
			var id = item['_id'];
			result.push(new KiiObject(bucket, id, item));
		    };
                    if (callback === undefined) {
                        resp = {
                            results : result,
                            params : params
                        };
                        return;
                    }
                    if (callback.success === undefined) { return; }
		    callback.success(result, params);
		},
		onError : (status : number, body : any) => {
                    if (callback === undefined) {
                        throw new Error(body);
                        return;
                    }
		    if (callback.error === undefined) { return; }
		    callback.error(status, body);
		}
	    });
            return resp;
	}
    }
}
