///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
declare function require(name : string) : any;
declare function describe(name : string, f : () => void);
declare function it(name : string, f : () => void);

var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');

describe('BucketAPI', () => { it('query', function() {
    var bucket : Kii.KiiBucket = new kii.KiiBucket(
        new kii.KiiApp(), 'sharedBucket');
    var params : Kii.QueryParams = new kii.QueryParams(
        kii.KiiClause.all()
    );
    
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respBody = {
        results : [
            {_id : "obj1122", _version : "2", _created : 1122, _modified : 2233,
             age : 31, name : 'fkm'},
        ],
    };
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.bucketAPI().query(bucket, params, {
        success : (list : Array<Kii.KiiObject>, p : Kii.QueryParams) => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/buckets/sharedBucket/query');
            assert.equal(client.method, 'POST');
            assert.equal(client.contentType, 'application/vnd.kii.QueryRequest+json');
            assert(list != null);
            assert.equal(list.length, 1);
            var obj : Kii.KiiObject = list[0];
            assert(obj != null);
            assert.equal(obj.getId(), 'obj1122');
            assert.equal(obj.data['age'], 31);
            assert.equal(obj.data['name'], 'fkm');
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });
});
});