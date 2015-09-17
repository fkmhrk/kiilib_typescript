declare module Kii {
    interface HttpClientCallback {
        onReceive(status: number, headers: any, body: any): any;
        onError(status: number, body: any): any;
    }
}
declare module Kii {
    interface HttpClient {
        setUrl(url: string): any;
        setMethod(method: string): any;
        setContentType(value: string): any;
        setHeader(key: string, value: string): any;
        setKiiHeader(context: KiiContext, authRequired: boolean): any;
        sendText(text: string, callback: HttpClientCallback): any;
        sendJson(json: any, callback: HttpClientCallback): any;
        send(callback: HttpClientCallback): any;
    }
}
declare var $: any;
declare module jquery {
    class JQueryClient implements Kii.HttpClient {
        private url;
        private method;
        private headers;
        constructor();
        setUrl(url: string): void;
        setMethod(method: string): void;
        setContentType(value: string): void;
        setHeader(key: string, value: string): void;
        setKiiHeader(context: Kii.KiiContext, authRequired: boolean): void;
        sendText(text: string, callback: Kii.HttpClientCallback): void;
        sendJson(json: any, callback: Kii.HttpClientCallback): void;
        send(callback: Kii.HttpClientCallback): void;
        private sendRequest(data, callback);
    }
}
declare module Kii {
    class KiiContext {
        appId: string;
        appKey: string;
        url: string;
        token: string;
        deviceId: string;
        clientFactory: () => HttpClient;
        constructor(appId: string, appKey: string, url: string);
        getAppId(): string;
        getAppKey(): string;
        getServerUrl(): string;
        setAccessToken(value: string): void;
        getAccessToken(): string;
        setDeviceId(value: string): void;
        getDeviceId(): string;
        setClientFactory(factory: () => HttpClient): void;
        getNewClient(): HttpClient;
    }
}
declare module Kii {
    class KiiApp {
        getPath(): string;
    }
}
declare module Kii {
    class KiiUser {
        id: string;
        data: any;
        constructor(id: string);
        getId(): string;
        getPath(): string;
    }
}
declare module Kii {
    class KiiGroup {
        id: string;
        name: string;
        owner: KiiUser;
        members: Array<KiiUser>;
        constructor(id: string);
        removeMember(member: KiiUser): void;
        getPath(): string;
    }
}
declare module Kii {
    class KiiBucket {
        owner: any;
        name: string;
        constructor(owner: any, name: string);
        getName(): string;
        getPath(): string;
    }
}
declare module Kii {
    class KiiObject {
        bucket: KiiBucket;
        id: string;
        data: any;
        constructor(bucket: KiiBucket, id: string, data: any);
        getId(): string;
        getPath(): string;
    }
}
declare module Kii {
    class KiiTopic {
        owner: any;
        name: string;
        constructor(owner: any, name: string);
        getName(): string;
        getPath(): string;
    }
}
declare module Kii {
    class KiiThing {
        id: string;
        data: any;
        constructor(id: string);
        getId(): string;
        getPath(): string;
    }
}
declare module Kii {
    class KiiGCMMessage {
        data: any;
        enable: boolean;
        constructor();
        setEnabled(value: boolean): void;
        toJson(): {
            "enabled": boolean;
        };
    }
}
declare module Kii {
    class KiiAPNsMessage {
        data: any;
        enable: boolean;
        constructor();
        setEnabled(value: boolean): void;
        toJson(): {
            "enabled": boolean;
        };
    }
}
declare module Kii {
    class KiiTopicMessage {
        data: any;
        sendToDevelopment: boolean;
        sendToProduction: boolean;
        pushMessageType: string;
        sendAppID: boolean;
        sendSender: boolean;
        sendWhen: boolean;
        sendOrigin: boolean;
        sendObjectScope: boolean;
        sendTopicID: boolean;
        gcm: any;
        apns: any;
        constructor();
        setSendToDevelopment(value: boolean): void;
        setSendToProduction(value: boolean): void;
        setPushMessageType(value: string): void;
        setSendAppID(value: boolean): void;
        setSendSender(value: boolean): void;
        setSendWhen(value: boolean): void;
        setSSendOrigin(value: boolean): void;
        setSendObjectScope(value: boolean): void;
        setSendTopicID(value: boolean): void;
        toJson(): {
            "sendToDevelopment": boolean;
            "sendToProduction": boolean;
            "pushMessageType": string;
            "sendAppID": boolean;
            "sendSender": boolean;
            "sendWhen": boolean;
            "sendOrigin": boolean;
            "sendObjectScope": boolean;
            "sendTopicID": boolean;
            "gcm": any;
            "apns": any;
        };
    }
}
declare module Kii {
    class KiiEvent {
        data: any;
        constructor(type: string);
    }
}
declare module Kii {
    class KiiClause {
        clause: any;
        constructor(type: string);
        static all(): KiiClause;
        static equals(field: string, value: any): KiiClause;
        static greaterThan(field: string, value: any, include: boolean): KiiClause;
        static lessThan(field: string, value: any, include: boolean): KiiClause;
        static range(field: string, fromValue: any, fromInclude: boolean, toValue: any, toInclude: boolean): KiiClause;
        static inClause<T>(field: string, values: Array<T>): KiiClause;
        static not(clause: KiiClause): KiiClause;
        static andClause(array: Array<KiiClause>): KiiClause;
        static orClause(array: Array<KiiClause>): KiiClause;
        private static toClauses(array);
        toJson(): any;
    }
}
declare module Kii {
    class QueryParams {
        clause: KiiClause;
        orderBy: string;
        descending: boolean;
        limit: number;
        paginationKey: string;
        constructor(clause: any);
        sortByAsc(field: string): void;
        sortByDesc(field: string): void;
        setLimit(limit: number): void;
        setPaginationKey(key: string): void;
        hasNext(): boolean;
        toJson(): any;
    }
}
declare module Kii {
    interface UserAPI {
        fetchUser(id: string): KiiUser;
        fetchUser(id: string, callback: UserCallback): any;
        update(user: KiiUser): KiiUser;
        update(user: KiiUser, callback: UserCallback): any;
        changePassword(user: KiiUser, current: string, newPassword: string): any;
        changePassword(user: KiiUser, current: string, newPassword: string, callback: KiiCallback): any;
        resetPassword(email: string): any;
        resetPassword(email: string, callback: KiiCallback): any;
        updateEmail(user: KiiUser, email: string, verified: boolean): KiiUser;
        updateEmail(user: KiiUser, email: string, verified: boolean, callback: UserCallback): any;
        updatePhone(user: KiiUser, phone: string, verified: boolean): KiiUser;
        updatePhone(user: KiiUser, phone: string, verified: boolean, callback: UserCallback): any;
        verifyPhone(user: KiiUser, code: string): KiiUser;
        verifyPhone(user: KiiUser, code: string, callback: UserCallback): any;
        subscribe(user: KiiUser, target: any): any;
        subscribe(user: KiiUser, target: any, callback: KiiCallback): any;
        unsubscribe(user: KiiUser, target: any): any;
        unsubscribe(user: KiiUser, target: any, callback: KiiCallback): any;
    }
}
declare module Kii {
    interface GroupAPI {
        create(name: string, owner: KiiUser, members: Array<KiiUser>): KiiGroup;
        create(name: string, owner: KiiUser, members: Array<KiiUser>, callback: GroupCallback): any;
        fetchGroup(id: string): KiiGroup;
        fetchGroup(id: string, callback: GroupCallback): any;
        updateGroupName(group: KiiGroup, name: string): KiiGroup;
        updateGroupName(group: KiiGroup, name: string, callback: GroupCallback): any;
        updateGroupOwner(group: KiiGroup, owner: KiiUser): KiiGroup;
        updateGroupOwner(group: KiiGroup, owner: KiiUser, callback: GroupCallback): any;
        deleteGroup(group: KiiGroup): any;
        deleteGroup(group: KiiGroup, callback: KiiCallback): any;
        getJoinedGroups(user: KiiUser, callback: any): Array<KiiGroup>;
        getJoinedGroups(user: KiiUser, callback: GroupListCallback): any;
        getOwnedGroups(user: KiiUser): Array<KiiGroup>;
        getOwnedGroups(user: KiiUser, callback: GroupListCallback): any;
        addMember(group: KiiGroup, user: KiiUser): KiiGroup;
        addMember(group: KiiGroup, user: KiiUser, callback: GroupCallback): any;
        removeMember(group: KiiGroup, user: KiiUser): KiiGroup;
        removeMember(group: KiiGroup, user: KiiUser, callback: GroupCallback): any;
        fetchMembers(group: KiiGroup): Array<KiiUser>;
        fetchMembers(group: KiiGroup, callback: UserListCallback): any;
    }
}
declare module Kii {
    interface BucketAPI {
        query(bucket: KiiBucket, params: QueryParams): QueryResult;
        query(bucket: KiiBucket, params: QueryParams, callback: QueryCallback): any;
    }
    interface QueryResult {
        results: Array<KiiObject>;
        params: QueryParams;
    }
}
declare module Kii {
    interface ObjectAPI {
        create(bucket: KiiBucket, data: any): KiiObject;
        create(bucket: KiiBucket, data: any, callback: ObjectCallback): any;
        getById(bucket: KiiBucket, id: string): KiiObject;
        getById(bucket: KiiBucket, id: string, callback: ObjectCallback): any;
        update(obj: KiiObject): KiiObject;
        update(obj: KiiObject, callback: ObjectCallback): any;
        updatePatch(obj: KiiObject, patch: any): KiiObject;
        updatePatch(obj: KiiObject, patch: any, callback: ObjectCallback): any;
        deleteObject(obj: KiiObject): any;
        deleteObject(obj: KiiObject, callback: KiiCallback): any;
    }
}
declare module Kii {
    interface ACLAPI {
        grant(target: any, verb: string, subject: any): any;
        grant(target: any, verb: string, subject: any, callback: KiiCallback): any;
        revoke(target: any, verb: string, subject: any): any;
        revoke(target: any, verb: string, subject: any, callback: KiiCallback): any;
    }
}
declare module Kii {
    interface TopicAPI {
        create(topic: KiiTopic): any;
        create(topic: KiiTopic, callback: KiiCallback): any;
        sendMessage(topic: KiiTopic, message: KiiTopicMessage): any;
        sendMessage(topic: KiiTopic, message: KiiTopicMessage, callback: KiiCallback): any;
    }
}
declare module Kii {
    interface AppAPI {
        login(userIdentifier: string, password: string): KiiUser;
        login(userIdentifier: string, password: string, callback: UserCallback): any;
        loginWithLocalPhone(phone: string, country: string, password: string): KiiUser;
        loginWithLocalPhone(phone: string, country: string, password: string, callback: UserCallback): any;
        loginAsAdmin(clientId: string, clientSecret: string): KiiUser;
        loginAsAdmin(clientId: string, clientSecret: string, callback: UserCallback): any;
        signUp(info: any, password: string): KiiUser;
        signUp(info: any, password: string, callback: UserCallback): any;
        deleteUser(user: KiiUser): any;
        deleteUser(user: KiiUser, callback: KiiCallback): any;
        sendEvent(event: KiiEvent): any;
        sendEvent(event: KiiEvent, callback: KiiCallback): any;
        userAPI(): UserAPI;
        groupAPI(): GroupAPI;
        bucketAPI(): BucketAPI;
        objectAPI(): ObjectAPI;
        aclAPI(): ACLAPI;
        topicAPI(): TopicAPI;
    }
    interface KiiCallback {
        success: () => void;
        error: (status: number, body: any) => void;
    }
    interface UserCallback {
        success: (user: KiiUser) => void;
        error: (status: number, body: any) => void;
    }
    interface UserListCallback {
        success: (list: Array<KiiUser>) => void;
        error: (status: number, body: any) => void;
    }
    interface GroupCallback {
        success: (group: KiiGroup) => void;
        error: (status: number, body: any) => void;
    }
    interface GroupListCallback {
        success: (list: Array<KiiGroup>) => void;
        error: (status: number, body: any) => void;
    }
    interface QueryCallback {
        success: (result: Array<KiiObject>, params: QueryParams) => void;
        error: (status: number, body: any) => void;
    }
    interface ObjectCallback {
        success: (obj: KiiObject) => void;
        error: (status: number, body: any) => void;
    }
}
declare module Kii {
    class KiiUserAPI implements UserAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        fetchUser(id: string, callback?: UserCallback): KiiUser;
        changePassword(user: KiiUser, current: string, newPassword: string, callback?: KiiCallback): void;
        resetPassword(email: string, callback?: KiiCallback): void;
        update(user: KiiUser, callback?: UserCallback): KiiUser;
        updateEmail(user: KiiUser, email: string, verified: boolean, callback?: UserCallback): KiiUser;
        updatePhone(user: KiiUser, phone: string, verified: boolean, callback?: UserCallback): KiiUser;
        verifyPhone(user: KiiUser, code: string, callback?: UserCallback): KiiUser;
        subscribe(user: KiiUser, target: any, callback?: KiiCallback): void;
        unsubscribe(user: KiiUser, target: any, callback?: KiiCallback): void;
    }
}
declare module Kii {
    class KiiGroupAPI implements GroupAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        create(name: string, owner: KiiUser, members: Array<KiiUser>, callback?: GroupCallback): KiiGroup;
        fetchGroup(id: string, callback?: GroupCallback): KiiGroup;
        updateGroupName(group: KiiGroup, name: string, callback?: GroupCallback): KiiGroup;
        updateGroupOwner(group: KiiGroup, owner: KiiUser, callback?: GroupCallback): KiiGroup;
        deleteGroup(group: KiiGroup, callback?: KiiCallback): void;
        getJoinedGroups(user: KiiUser, callback?: GroupListCallback): KiiGroup[];
        getOwnedGroups(user: KiiUser, callback?: GroupListCallback): KiiGroup[];
        private getGroups(user, query, callback);
        private toKiiGroup(item);
        addMember(group: KiiGroup, user: KiiUser, callback?: GroupCallback): KiiGroup;
        removeMember(group: KiiGroup, user: KiiUser, callback?: GroupCallback): KiiGroup;
        fetchMembers(group: KiiGroup, callback?: UserListCallback): KiiUser[];
    }
}
declare module Kii {
    class KiiBucketAPI implements BucketAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        query(bucket: KiiBucket, params: QueryParams, callback?: QueryCallback): QueryResult;
    }
}
declare module Kii {
    class KiiObjectAPI implements ObjectAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        create(bucket: KiiBucket, data: any, callback?: ObjectCallback): KiiObject;
        getById(bucket: KiiBucket, id: string, callback?: ObjectCallback): KiiObject;
        update(obj: KiiObject, callback?: ObjectCallback): KiiObject;
        updatePatch(obj: KiiObject, patch: any, callback?: ObjectCallback): KiiObject;
        deleteObject(obj: KiiObject, callback?: KiiCallback): void;
    }
}
declare module Kii {
    class KiiTopicAPI implements TopicAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        create(topic: KiiTopic, callback?: KiiCallback): void;
        sendMessage(topic: KiiTopic, message: KiiTopicMessage, callback?: KiiCallback): void;
    }
}
declare module Kii {
    class KiiACLAPI implements ACLAPI {
        context: KiiContext;
        constructor(context: KiiContext);
        grant(target: any, verb: string, subject: any, callback?: KiiCallback): void;
        revoke(target: any, verb: string, subject: any, callback?: KiiCallback): void;
        private exec(method, target, verb, subject, callback);
    }
}
declare module Kii {
    class KiiAppAPI implements AppAPI {
        context: KiiContext;
        userAPI_: UserAPI;
        groupAPI_: GroupAPI;
        bucketAPI_: BucketAPI;
        objectAPI_: ObjectAPI;
        aclAPI_: ACLAPI;
        topicAPI_: TopicAPI;
        constructor(context: KiiContext);
        login(userIdentifier: string, password: string, callback?: UserCallback): KiiUser;
        loginWithLocalPhone(phone: string, country: string, password: string, callback?: UserCallback): KiiUser;
        loginAsAdmin(clientId: string, clientSecret: string, callback?: UserCallback): KiiUser;
        private execLogin(body, callback?);
        signUp(info: any, password: string, callback?: UserCallback): KiiUser;
        deleteUser(user: KiiUser, callback?: KiiCallback): void;
        sendEvent(event: KiiEvent, callback?: KiiCallback): void;
        userAPI(): UserAPI;
        groupAPI(): GroupAPI;
        bucketAPI(): BucketAPI;
        objectAPI(): ObjectAPI;
        aclAPI(): ACLAPI;
        topicAPI(): TopicAPI;
    }
}
