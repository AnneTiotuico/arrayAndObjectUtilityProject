var _ = function(element) {
  var u = {
    first: function() {
      return element[0];
    },
    last: function() {
      return element[element.length - 1];
    },
    without: function(...values) {
      let newArr = element.slice(0);

      values.forEach(value => {
        let idx = newArr.indexOf(value);
        newArr.splice(idx, 1);
      })
      
      return newArr;
    },
    lastIndexOf(value) {
      return element.lastIndexOf(value);
    },
    sample(qty) {
      if (qty === undefined) {
        return element[0];
      } else {
        return element.slice(0, 4);
      }
    },
    findWhere(obj) {
      // return the first object with properties that match the supplied object. If no objects match all the supplied properties, undefined is returned.
      return element.filter(ob => {
        let objValues = Object.values(obj);
        let obValues = Object.values(ob);
        return objValues.every(val => obValues.includes(val))
      })[0];
    },
    where(obj) {
      // return an array of all objects with properties that match the supplied object.
      return element.filter(ob => {
        let objValues = Object.values(obj);
        let obValues = Object.values(ob);
        return objValues.every(val => obValues.includes(val))
      });
    },
    pluck(key) {
      //  return an array of the values that match the supplied key from a collection of objects.
      return element.filter(ob => {
        let obValues = Object.keys(ob);
        return obValues.includes(key)
      }).map(ob => ob[key]);
    },
    keys() {
      // return an array of the keys from an object.
      return Object.keys(element);
    },
    values() {
      // return an array of the values from an object.
      return Object.values(element);
    },

    pick(...keys) {
      // return a new object with the passed in properties taken from the old object. Accepts one or more arguments.
      let newObj = [];
      let oldProps = Object.entries(element);
      oldProps.forEach(([key, value]) => {
        if (keys.includes(key)) {
          newObj.push([key, value])
        }
      });

      return Object.fromEntries(newObj);
    },

    omit(...keys) {
      // return a new object with any passed in properties omitted.
      let newObj = [];
      let oldProps = Object.entries(element);
      oldProps.forEach(([key, value]) => {
        if (!keys.includes(key)) {
          newObj.push([key, value])
        }
      })
      return Object.fromEntries(newObj);
    },

    has(ownProp) {
      // return true when the property passed in exists, false if it doesn't.
      element.hasOwnProperty = Object.prototype.hasOwnProperty.bind(element);
      return element.hasOwnProperty(ownProp);
    }, 
  };

  (function(methods) {
    methods.forEach(method => {
      u[method] = _[method]
    })
  }(['isElement', 'isArray', 'isObject', 'isFunction', 'isBoolean', 'isString', 'isNumber']));

  return u;
};

_.range = function(...values) {
  if (values.length === 1) {
    return [...Array(values[0]).keys()];
  }; 
  let start = values[0];
  let end = values[1];
  let result = [];
  while (start < end) {
    result.push(start);
    start++;
  };
  return result;
};

_.extend = function(...objs) {
  // takes two or more objects, taking the properties and values from the last argument and adding them to the argument before it. Object extensions occur recursively from last argument to first. The first argument ends up being modified to include all properties and values from the other objects passed in.
  return Object.assign(objs[0], ...objs)
};

_.isElement = function(value) {
  // return true if argument is a DOM element.
  return value instanceof HTMLElement;
};

_.isArray = function(value) {
  // return true if argument is an array.
  return Array.isArray(value)
};

_.isObject = function(value) {
  // return true if argument is an object or a function.
  return (typeof value === 'object' || typeof value === 'function'); 
};

_.isFunction = function(value) {
  // return true if argument is a function.
  return typeof value === 'function';
};

_.isString = function(value) {
  // return true if argument is a string.
  return  value.constructor.name === 'String';
};

_.isNumber = function(value) {
  // return true if argument is a number. Also returns true for objects created with the Number constructor.
  return value.constructor.name === 'Number';
};

_.isBoolean = function(value) {
  // return true if argument is a boolean. Also returns true for objects created with the Boolean constructor.
  return value.constructor.name === 'Boolean';
};