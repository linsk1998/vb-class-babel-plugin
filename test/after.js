function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _Anonymous = null;

var Anonymous = /*#__PURE__*/function () {
  var _Anonymous2 = function () {};

  return _Anonymous2;
}();

var Animal = /*#__PURE__*/function () {
  function Animal() {}

  return Animal;
}();

var Dog = /*#__PURE__*/function (_Super) {
  _inheritsLoose(Dog, getArg1(Animal));

  function Dog() {}

  return Dog;
}(getArg1(Animal));

var Cat = /*#__PURE__*/function (Animal) {
  _inheritsLoose(Cat, Animal);

  function Cat() {}

  return Cat;
}(Animal);

var cat = new Cat();
console.log(cat instanceof Cat);
console.log(cat instanceof Animal);

function getArg1(arg1) {
  return arg1;
}