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

	public removeMember(member : KiiUser) {
	    var index = -1;
	    for (var i = 0 ; i < this.members.length ; ++i) {
		if (this.members[i].id === member.id) {
		    index = i;
		    break;
		}
	    }
	    if (index == -1) { return; }
	    this.members.splice(index, 1);
	}
	
	public getPath() {
	    return '/groups/' + this.id;
	}

        public getSubject() {
            return 'GroupID:' + this.id;
        }
    }
}