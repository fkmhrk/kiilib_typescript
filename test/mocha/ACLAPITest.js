///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');
describe('ACLAPI', function () {
    it('grant', function () {
        var targetBucket = new kii.KiiBucket(new kii.KiiApp(), 'bucket1122');
        var verb = 'QUERY_OBJECTS_IN_BUCKET';
        var subject = new kii.KiiUser('user1122');
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respStatus = 204;
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.aclAPI().grant(targetBucket, verb, subject, {
            success: function () {
                assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/buckets/bucket1122/acl/QUERY_OBJECTS_IN_BUCKET/UserID:user1122');
                assert.equal(client.method, 'PUT');
                assert.equal(client.contentType, null);
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
    it('grant-group', function () {
        var targetBucket = new kii.KiiBucket(new kii.KiiApp(), 'bucket1122');
        var verb = 'QUERY_OBJECTS_IN_BUCKET';
        var subject = new kii.KiiGroup('group2233');
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respStatus = 204;
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.aclAPI().grant(targetBucket, verb, subject, {
            success: function () {
                assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/buckets/bucket1122/acl/QUERY_OBJECTS_IN_BUCKET/GroupID:group2233');
                assert.equal(client.method, 'PUT');
                assert.equal(client.contentType, null);
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
    it('revoke', function () {
        var targetBucket = new kii.KiiBucket(new kii.KiiApp(), 'bucket1122');
        var verb = 'QUERY_OBJECTS_IN_BUCKET';
        var subject = new kii.KiiUser('user1122');
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respStatus = 204;
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.aclAPI().revoke(targetBucket, verb, subject, {
            success: function () {
                assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/buckets/bucket1122/acl/QUERY_OBJECTS_IN_BUCKET/UserID:user1122');
                assert.equal(client.method, 'DELETE');
                assert.equal(client.contentType, null);
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
});
