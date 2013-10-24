module Kii {
    export class KiiGCMMessage {
	data : any;
	enable : boolean;

	constructor() {
	    this.data = {};
            this.enable = true;
	}

	setEnabled(value : boolean) {
            this.enable = value;
	}

	toJson() {
            var json = {
                "enabled" : this.enable
            };
            if (Object.keys(this.data).length > 0) {
		json['data'] = this.data;
            }	    

            return json;
	}

    }
}