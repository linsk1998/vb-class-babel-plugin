var _Anonymous = null;
var Anonymous = class { };
class Empty {
}
class HasConstructor {
	constructor(a,b,c,...d){
	}
}

class SuperExpression extends getArg1(EmptySuper) {
}
function getArg1(arg1){
	return arg1;
}
class Extend extends EmptySuper {
}
class ExtendHasSuper extends EmptySuper {
	constructor(){
		super();
	}
}

class ExtendHasConstructor extends EmptySuper {
    a;
	constructor(){
		super();
        this.a=1;
	}
}