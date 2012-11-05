var inheritance = require('../inheritance')

var inherit = inheritance.inherit
var inheritPrototype = inheritance.inheritPrototype
var inheritStatic = inheritance.inheritStatic
var setStatic = inheritance.setStatic


/* Data setup */
var makeFireDesc = 'rubs two wood pieces against each other'
var useElectricityDesc = 'bangs piezoelectric crystals'
var useVizualizationDesc = 'imagines fire in his mind eye and lets the Force work for him'
var isDancingDesc = 'is just dancing a waltz'
var existenceDesc = 'is';

var Ancestor = function(){}

var Descendant = function(){}
Descendant.type = 'descendant'

var WingMaker = function(){}
WingMaker.type = 'wingMaker'

Ancestor.prototype = {
  makeFire : function(){
    return this.class.type + ' ' + makeFireDesc;
  }
}

setStatic(Ancestor, {
  type: 'ancestor',
  count: 0,
  exists: function(){
    return this.type + ' ' + existenceDesc;
  }
})

Descendant.prototype = {
  makeFire : function(){
    return this.class.type + ' ' + useElectricityDesc;
  },
  danceWaltz : function(){
    return this.class.type + ' ' + isDancingDesc
  },
  subtract : function(a, b){
    return this.class.type + ' says the result is ' + (a-b)
  }
}

WingMaker.prototype = {
  makeFire : function(){
    return this.class.type + ' ' + useVizualizationDesc;
  }
}

inherit(Descendant, Ancestor);
inherit(WingMaker, Descendant);

var nestor = new Ancestor();
var tesla = new Descendant();
var shan = new WingMaker();
/**/



/* Testing methods */
var testCount = 0;
var successCount = 0;
var failureCount = 0;

var test = function(subject, token, expectation){
  testCount++;

  if(token === expectation){
    successCount++
  }
  else{
    console.log(subject + ' should be: <<' + expectation + '>> but is: <<' + token + '>> instead.')
    failureCount++
  }
}

var testArray = function(subject, token, expectation){
  testCount++

  for(var i in expectation){
    if(token[i] !== expectation[i]){
      console.log(subject + ' on index ' + i + ' should be: <<' + expectation + '>> but is: <<' + token + '>> instead.')
      failureCount++
      break
    }
  }

  successCount++
}
/**/



/* Tests */
test('typeof inherit', (typeof inherit), 'function')
test('typeof inheritPrototype', (typeof inheritPrototype), 'function')
test('typeof inheritStatic', (typeof inheritStatic), 'function')
test('typeof setStatic', (typeof setStatic), 'function')

test('Ancestor.type', Ancestor.type, 'ancestor')
test('Ancestor.count', Ancestor.count, 0)
test('Ancestor.exists()', Ancestor.exists(), 'ancestor is')
Ancestor.count++

test('nestor.makeFire()', nestor.makeFire(), 'ancestor ' + makeFireDesc)
test('nestor.class', nestor.class, Ancestor)

test('Descendant.type', Descendant.type, 'descendant')
test('Descendant.exists()', Descendant.exists(), 'descendant is')
test('Descendant.count', Descendant.count, 0)
test('Descendant.ancestor', Descendant.ancestor, Ancestor)

test('tesla.makeFire()', tesla.makeFire(), 'descendant ' + useElectricityDesc)
test('tesla.ancestor', tesla.ancestor, Ancestor)
test('tesla.class', tesla.class, Descendant)
test('tesla.danceWaltz()', tesla.danceWaltz(), 'descendant ' + isDancingDesc)

Descendant.count++
test('WingMaker.type', WingMaker.type, 'wingMaker')
test('WingMaker.exists()', WingMaker.exists(), 'wingMaker is')
test('WingMaker.count', WingMaker.count, 0)
test('WingMaker.ancestor', WingMaker.ancestor, Descendant);
testArray('WingMaker.ancestors()', WingMaker.ancestors(), [WingMaker.ancestor, Descendant.ancestor])
testArray('WingMaker.ancestorTypes()', WingMaker.ancestorTypes(), ['descendant', 'ancestor'])

test('shan.makeFire()', shan.makeFire(), 'wingMaker ' + useVizualizationDesc);
test('shan.ancestor', shan.ancestor, Descendant)
test('shan.class', shan.class, WingMaker)
test('shan.danceWaltz()', shan.danceWaltz(), 'wingMaker ' + isDancingDesc)
test('shan.subtract(5, 4)', shan.subtract(5, 4), 'wingMaker says the result is 1')
testArray('shan.ancestors()', shan.ancestors(), [Descendant, Ancestor])

test('shan.superFunction("makeFire")', shan.superFunction('makeFire'), 'wingMaker ' + useElectricityDesc)
test('shan.superFunction("nonExistent")', shan.superFunction('nonExistent'), null)

WingMaker.ancestor = WingMaker
testArray('Wingmaker.ancestors()', WingMaker.ancestors(), [])
WingMaker.ancestor = Descendant

test('shan.superFunction("subtract", 5, 4)', shan.superFunction('subtract', 5, 4), 'wingMaker says the result is 1')
/**/

console.log(testCount + ' tests. ' + failureCount + ' failed. ' + successCount + ' succeeded.')
