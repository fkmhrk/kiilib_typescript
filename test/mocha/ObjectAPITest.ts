///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
declare function require(name : string) : any;
declare function describe(name : string, f : () => void);
declare function it(name : string, f : () => void);

var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');

describe('ObjectAPI', () => { it('create', function() {
    var bucket : Kii.KiiBucket = new kii.KiiBucket(
        new kii.KiiUser('me'), 'myBucket');
    var data = {
        name : 'fkm',
        age : 31,
    };
    
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respStatus = 201;
    client.respBody = {
        objectID : 'obj1122',
        createdAt : 1122,
    };
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.objectAPI().create(bucket, data, {
        success : (obj : Kii.KiiObject) => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/users/me/buckets/myBucket/objects');
            assert.equal(client.method, 'POST');
            assert.equal(client.contentType, 'application/json');
            assert(obj != null);
            assert.equal(obj.getId(), 'obj1122');
            assert.equal(obj.data['name'], 'fkm');
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });
});it('getById', function() {
    var bucket : Kii.KiiBucket = new kii.KiiBucket(
        new kii.KiiUser('me'), 'myBucket');
    var data = {
        name : 'fkm',
        age : 31,
    };
    
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respStatus = 201;
    client.respBody = {
        _id : 'obj1122',
        _createdAt : 1122,
        _modifiedAt : 2233,
        name : 'fkm',
        age : 31,
    };
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.objectAPI().getById(bucket, 'obj2233', {
        success : (obj : Kii.KiiObject) => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/users/me/buckets/myBucket/objects/obj2233');
            assert.equal(client.method, 'GET');
            assert.equal(client.contentType, null);
            assert(obj != null);
            assert.equal(obj.getId(), 'obj2233');
            assert.equal(obj.data['name'], 'fkm');
            assert.equal(obj.data['age'], 31);
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });    
});});