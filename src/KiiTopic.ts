module Kii {
    export class KiiTopic {
        owner : any;
        name : string;

        constructor(owner : any, name : string) {
	    this.owner = owner;
	    this.name = name;
	}

        public getName() {
	    return this.name;
	}
		    
	public getPath() {
	    return this.owner.getPath() + '/topics/' + this.name;
	}
    }
}