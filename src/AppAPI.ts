module Kii {
    interface AppAPI {
        login(userIdentifier : string, password : string);
        loginAsAdmin(clientId : string, clientSecret : string);

        // APIs
        userAPI();
        groupAPI();
        bucketAPI();
        objectAPI();
        aclAPI();
        topicAPI();  
    }
}