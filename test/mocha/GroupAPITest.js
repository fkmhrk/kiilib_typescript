///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');
describe('GroupAPI', function () {
    it('create', function () {
        var name = 'myGroup';
        var owner = new kii.KiiUser('user2345');
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respBody = {
            groupID: 'group2233'
        };
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.groupAPI().create(name, owner, [], {
            success: function (group) {
                assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/groups');
                assert.equal(client.method, 'POST');
                assert.equal(client.contentType, 'application/vnd.kii.GroupCreationRequest+json');
                assert(group != null);
                assert.equal(group.getId(), 'group2233');
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
    it('fetchGroup', function () {
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respBody = {
            groupID: 'group1122',
            name: 'myGroup',
            owner: 'user1122'
        };
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.groupAPI().fetchGroup('group1122', {
            success: function (group) {
                assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/groups/group1122');
                assert.equal(client.method, 'GET');
                assert.equal(client.contentType, null);
                assert(group != null);
                assert.equal(group.getId(), 'group1122');
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
});
