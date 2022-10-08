var _Anonymous = null;
var Anonymous = class { };
class Animal {
}

class Dog extends getArg1(Animal) {
}
class Cat extends Animal {
	constructor(){

	}
}
var cat = new Cat();
console.log(cat instanceof Cat);
console.log(cat instanceof Animal);


function getArg1(arg1){
	return arg1;
}