function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _Anonymous = null;

var Anonymous = /*#__PURE__*/function () {
  var _Anonymous2 = function () {};

  return _Anonymous2;
}();

var Empty = /*#__PURE__*/function () {
  function Empty() {}

  return Empty;
}();

var HasConstructor = /*#__PURE__*/function () {
  function HasConstructor(a, b, c, ...d) {}

  return HasConstructor;
}();

var SuperExpression = /*#__PURE__*/function (_Super) {
  function SuperExpression() {}

  _inheritsLoose(SuperExpression, getArg1(EmptySuper));

  return SuperExpression;
}(getArg1(EmptySuper));

function getArg1(arg1) {
  return arg1;
}

var Extend = /*#__PURE__*/function (EmptySuper) {
  function Extend() {}

  _inheritsLoose(Extend, EmptySuper);

  return Extend;
}(EmptySuper);

var ExtendHasSuper = /*#__PURE__*/function (EmptySuper) {
  function ExtendHasSuper() {}

  _inheritsLoose(ExtendHasSuper, EmptySuper);

  return ExtendHasSuper;
}(EmptySuper);

var ExtendHasConstructor = /*#__PURE__*/function (EmptySuper) {
  function ExtendHasConstructor() {}

  _inheritsLoose(ExtendHasConstructor, EmptySuper);

  return ExtendHasConstructor;
}(EmptySuper);