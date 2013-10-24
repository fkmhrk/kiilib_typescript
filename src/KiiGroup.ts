module Kii {
    export class KiiGroup {
        id : string;
	name : string;
	owner : KiiUser;
	members : Array<KiiUser>;

        constructor(id : string) {
      	    this.id = id;
	    this.members = [];
	}

	public getPath() {
	    return '/groups/' + this.id;
	}	
    }
}