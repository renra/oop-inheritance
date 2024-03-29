var inherit = function(target, source){
  inheritPrototype(target, source);
  inheritStatic(target, source);

  // Leave a trace
  target.ancestor = source;
  target.prototype.ancestor = source
  target.prototype.class = target

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
  target.superFunction = superStaticFunction

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

// Head of the hierarchy initialization helper
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

  target.prototype.class = target
}

var ancestors = function(){
  var _ancestors = [];
  var iter = this.ancestor;

  while( iter ){
    _ancestors.push(iter);
    iter = iter === iter.ancestor ? null : iter.ancestor
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
  var args = [];

  if(this.__ghost == null){
    // And the ghost of the ancestors will be with you forever
    this.__ghost = new this.ancestor()
  }

  //TODO : consider underscore
  for(var i in arguments){
    if( i > 0 ){
      args.push(arguments[i])
    }
  }

  if(this.__ghost[functionName]){
    retval = this.__ghost[functionName].apply(this, args)
  }
  return retval;
}

var superStaticFunction = function(functionName){
  var retval = null;
  var args = [];

  //TODO : consider underscore
  for(var i in arguments){
    if( i > 0 ){
      args.push(arguments[i])
    }
  }

  if(this.ancestor[functionName]){
    retval = this.ancestor[functionName].apply(this, args)
  }

  return retval
}

exports.inherit = inherit
exports.inheritPrototype = inheritPrototype
exports.inheritStatic = inheritStatic
exports.setStatic = setStatic
