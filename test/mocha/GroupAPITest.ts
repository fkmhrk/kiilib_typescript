///<reference path="./MockClient.ts"/>
///<reference path="../../bin/KiiLib.d.ts"/>
declare function require(name : string) : any;
declare function describe(name : string, f : () => void);
declare function it(name : string, f : () => void);

var assert = require('assert');
var kii = require('../../bin/KiiLib-jquery.js');
var mock = require('./MockClient.js');

describe('GroupAPI', () => { it('create', function() {
    var name = 'myGroup';
    var owner : Kii.KiiUser = new kii.KiiUser('user2345');
    
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respBody = {
        groupID : 'group2233',
    };
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.groupAPI().create(name, owner, [], {
        success : (group : Kii.KiiGroup) => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/groups');
            assert.equal(client.method, 'POST');
            assert.equal(client.contentType, 'application/vnd.kii.GroupCreationRequest+json');
            assert(group != null);
            assert.equal(group.getId(), 'group2233');
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });
});it('fetchGroup', function() {
    var c : Kii.KiiContext = mock.newContext();
    var client : MockClient = <MockClient>c.getNewClient();
    client.respBody = {
        groupID : 'group1122',
        name : 'myGroup',
        owner : 'user1122',
    };
    
    var appAPI : Kii.AppAPI = new kii.KiiAppAPI(c);
    appAPI.groupAPI().fetchGroup('group1122', {
        success : (group : Kii.KiiGroup) => {
            assert.equal(client.url, 'https://api-jp.kii.com/api/apps/AppID/groups/group1122');
            assert.equal(client.method, 'GET');
            assert.equal(client.contentType, null);
            assert(group != null);
            assert.equal(group.getId(), 'group1122');
        },
        error : (status : number, body : any) => {
            assert.fail(1, 1, 'error status=' + status);
        }
    });    
});});