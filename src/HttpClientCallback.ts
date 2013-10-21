module Kii {
    export interface HttpClientCallback {
        onReceive(status : number, headers : any, body : any);
	onError(status : number, body : any);
    }
}