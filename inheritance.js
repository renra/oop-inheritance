var util = require('util');

var inherit = function(to, from){
  util.inherits(to, from)
  static(to, from.static)
  to.ancestor = from
}

var static = function(target, propsNFuns){
  target.static = propsNFuns;
  for(var key in propsNFuns){
    if(propsNFuns.hasOwnProperty(key) && target[key] === undefined){
      target[key] = propsNFuns[key]
    }
  }
}

//Class stuff
var Ancestor = function(){}
static(Ancestor, {
  type : 'ancestor',
  foo : function(){
    console.log( 'Yea! A static function. Says the : ' + this.type )
  },
  count : 0
});

//Instance stuff
Ancestor.prototype.bar = function(){ util.puts('I say bar') }
console.log(Ancestor);
Ancestor.foo();
console.log(Ancestor.type);

var Descendant = function(){}
static(Descendant, { type: 'descendant' })
inherit(Descendant, Ancestor)

Descendant.foo();
console.log(Descendant.type);
var desc = new Descendant()
desc.bar();

Descendant.count++
util.puts(Descendant.count)
util.puts(Ancestor.count)

console.log(Descendant.ancestor.type);
