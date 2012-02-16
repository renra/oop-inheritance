var inherit = function(target, source){
  inheritPrototype(target, source);
  inheritStatic(target, source);
  target.ancestor = source;
  target.prototype.ancestor = source
}

// Inherit instance methods
// don't overwrite anything that is already defined
var inheritPrototype = function(target, source){
  if(target.prototype == null){
    target.prototype = {}
  }

  for(var key in source.prototype){
    if(source.prototype.hasOwnProperty(key) && target.prototype[key] === undefined){
      target.prototype[key] = source.prototype[key];
    }
  }
}


// Inherit class methods with the same care
var inheritStatic = function(target, source){
  if(target.static == null){
    target.static = {}
  }

  for(var key in source.static){
    if(source.static.hasOwnProperty(key)){
      if(target[key] == null){
        target[key] = source.static[key];
        target.static[key] = source[key];
      }
      else{
        target.static[key] = target[key];
      }
    }
  }
}

var setStatic = function(target, propsNDefs){
  if(target.static == null){
    target.static = {}
  }

  for(var key in propsNDefs){
    if(propsNDefs.hasOwnProperty(key) && target.static[key] === undefined){
      target.static[key] = propsNDefs[key];
      target[key] = target.static[key]
    }
  }
}

exports.inherit = inherit
exports.inheritPrototype = inheritPrototype
exports.inheritStatic = inheritStatic
exports.setStatic = setStatic
