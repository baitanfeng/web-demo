var Person = (function () {

  var privateData = {},
    privateId = 0;

  function Person(name) {
    Object.defineProperty(this, "_id", {
      value: privateId++
    });

    privateData[this._id] = {
      name: name
    };
  }

  Person.prototype.getName = function () {
    return privateData[this._id].name;
  };

  return Person;
}());