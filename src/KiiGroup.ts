module Kii {
    export class KiiGroup {
        id : string;
	name : string;
	owner : KiiUser;

        constructor(id : string) {
      	     this.id = id;
	}

	public getPath() {
	    return '/groups/' + this.id;
	}	
    }
}