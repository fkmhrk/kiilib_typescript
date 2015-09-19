///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
declare function require(name : string) : any;
declare function describe(name : string, f : () => void);
declare function it(name : string, f : () => void);

var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');

describe('ACLAPI', () => { it('grant', function() {
    var targetBucket : Kii.KiiBucket = new kii.KiiBucket(
        new kii.KiiApp(), 'bucket1122');
    var verb = 'QUERY_OBJECTS_IN_BUCKET';
    var subject : Kii.KiiUser = new kii.KiiUser('user1122');
    
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respStatus = 204;
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.aclAPI().grant(targetBucket, verb, subject, {
        success : () => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/buckets/bucket1122/acl/QUERY_OBJECTS_IN_BUCKET/UserID:user1122');
            assert.equal(client.method, 'PUT');
            assert.equal(client.contentType, null);
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });
});it('revoke', function() {
    var targetBucket : Kii.KiiBucket = new kii.KiiBucket(
        new kii.KiiApp(), 'bucket1122');
    var verb = 'QUERY_OBJECTS_IN_BUCKET';
    var subject : Kii.KiiUser = new kii.KiiUser('user1122');
    
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respStatus = 204;
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.aclAPI().revoke(targetBucket, verb, subject, {
        success : () => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/buckets/bucket1122/acl/QUERY_OBJECTS_IN_BUCKET/UserID:user1122');
            assert.equal(client.method, 'DELETE');
            assert.equal(client.contentType, null);
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });    
});});