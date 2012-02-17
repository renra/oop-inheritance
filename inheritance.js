var inherit = function(target, source){
  inheritPrototype(target, source);
  inheritStatic(target, source);

  // Leave a trace
  target.ancestor = source;
  target.prototype.ancestor = source

  // Give them the tools to follow the trace
  target.ancestors = ancestors
  target.ancestorTypes = ancestorTypes
  target.prototype.ancestors = ancestors
  target.prototype.ancestorTypes = ancestorTypes
  target.prototype.superFunction = superFunction
  
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
    if(propsNDefs.hasOwnProperty(key) && target.static[key] == null){
      target.static[key] = propsNDefs[key];
      target[key] = target.static[key]
    }
  }
}

var ancestors = function(){
  var _ancestors = [];
  var iter = this.ancestor;

  while( iter ){
    _ancestors.push(iter);
    iter = iter.ancestor;
  }
  
  return _ancestors;
}

var ancestorTypes = function(){
  var _ancestorTypes = [];
  var ancestors = this.ancestors();

  for(var i in ancestors){
    _ancestorTypes.push(ancestors[i].type);
  }
 
  return _ancestorTypes;
}

var superFunction = function(functionName){
  var retval = null;

  if(this.__ghost == null){
    // And the ghost of the ancestors will be with you forever
    this.__ghost = new this.ancestor()
  }

  if(this.__ghost[functionName]){
    retval = this.__ghost[functionName].call(this)
  }
  return retval;
}

exports.inherit = inherit
exports.inheritPrototype = inheritPrototype
exports.inheritStatic = inheritStatic
exports.setStatic = setStatic
