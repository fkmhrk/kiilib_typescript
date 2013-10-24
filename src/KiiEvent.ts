module Kii {
    export class KiiEvent {
        public data : any;

        constructor(type : string) {
	    this.data = {
		'_type' : type,
		'_triggeredAt' : new Date().getTime()
	    };
	}
    }
}