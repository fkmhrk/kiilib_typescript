///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');
describe('BucketAPI', function () {
    it('query', function () {
        var bucket = new kii.KiiBucket(new kii.KiiApp(), 'sharedBucket');
        var params = new kii.QueryParams(kii.KiiClause.all());
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respBody = {
            results: [
                { _id: "obj1122", _version: "2", _created: 1122, _modified: 2233,
                    age: 31, name: 'fkm' },
            ]
        };
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.bucketAPI().query(bucket, params, {
            success: function (list, p) {
                assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/buckets/sharedBucket/query');
                assert.equal(client.method, 'POST');
                assert.equal(client.contentType, 'application/vnd.kii.QueryRequest+json');
                assert(list != null);
                assert.equal(list.length, 1);
                var obj = list[0];
                assert(obj != null);
                assert.equal(obj.getId(), 'obj1122');
                assert.equal(obj.data['age'], 31);
                assert.equal(obj.data['name'], 'fkm');
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
});
