module Kii {
  export class KiiContext {
      appId : string;
      appKey : string;
      url : string;
      token : string;

      constructor(appId : string, appKey : string, url : string) {
          this.appId = appId;
	  this.appKey = appKey;
	  this.url = url;
      }

      
      
  }
}