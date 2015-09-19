///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');
describe('AppAPI', function () {
    it('login', function () {
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respBody = {
            access_token: 'token1122',
            id: 'user1122'
        };
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.login('name', 'pass', {
            success: function (user) {
                assert.equal(client.url, 'https://api-jp.kii.com/api/oauth2/token');
                assert.equal(client.method, 'POST');
                assert.equal(client.contentType, 'application/json');
                assert(user != null);
                assert.equal(user.getId(), 'user1122');
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
    it('signup', function () {
        var info = {
            loginName: 'fkm1122'
        };
        var c = mock.newContext();
        var client = c.getNewClient();
        client.respBody = {
            userID: 'user1122'
        };
        var appAPI = new kii.KiiAppAPI(c);
        appAPI.signUp(info, 'pass', {
            success: function (user) {
                assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/users');
                assert.equal(client.method, 'POST');
                assert.equal(client.contentType, 'application/json');
                assert.equal(client.bodyJson['loginName'], 'fkm1122');
                assert.equal(client.bodyJson['password'], 'pass');
                assert(user != null);
                assert.equal(user.getId(), 'user1122');
            },
            error: function (status, body) {
                assert.fail(1, 1, 'error status=' + status);
            }
        });
    });
});
