///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
declare function require(name : string) : any;
declare function describe(name : string, f : () => void);
declare function it(name : string, f : () => void);

var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');

describe('UserAPI', () => { it('fetchUser', function() {
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respBody = {
        id : 'user1122',
    };
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.userAPI().fetchUser('user1122', {
        success : (user : Kii.KiiUser) => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/users/user1122');
            assert.equal(client.method, 'GET');
            assert.equal(client.contentType, null);
            assert(user != null);
            assert.equal(user.getId(), 'user1122');
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });
});it('update', function() {
    var user : Kii.KiiUser = new kii.KiiUser('user1122');
    user.data = {};
    user.data['age'] = 31;
    
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respBody = {
        modifiedAt : 2233,
    };
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.userAPI().update(user, {
        success : (user : Kii.KiiUser) => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/users/user1122');
            assert.equal(client.method, 'POST');
            assert.equal(client.contentType, 'application/vnd.kii.UserUpdateRequest+json');
            assert(user != null);
            assert.equal(user.getId(), 'user1122');
            assert.equal(user.data['age'], 31);
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });
});});