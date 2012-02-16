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

setStatic(Ancestor, {
  type: 'ancestor',
  count: 0,
  exists: function(){
    return this.type + ' ' + existenceDesc;
  }
})

Ancestor.prototype = {
  class : Ancestor,
  makeFire : function(){
    return this.class.type + ' ' + makeFireDesc;
  }
}

Descendant.prototype = {
  class : Descendant,
  makeFire : function(){
    return this.class.type + ' ' + useElectricityDesc;
  },
  danceWaltz : function(){
    return this.class.type + ' ' + isDancingDesc
  }
}

WingMaker.prototype = {
  class : WingMaker,
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



/* Testing method */
var testCount = 0;
var successCount = 0;
var failureCount = 0;

var test = function(subject, token, expectation){
  testCount++;
  try{
    if(token !== expectation){
      throw new Error(subject + ' should be: <<' + expectation + '>> but is: <<' + token + '>> instead.');
    }
    successCount++;
  }
  catch(err){
    failureCount++;
    console.log(err);
  }
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
test('WingMaker.ancestor', WingMaker.ancestor, Descendant)

test('shan.makeFire()', shan.makeFire(), 'wingMaker ' + useVizualizationDesc);
test('shan.ancestor', shan.ancestor, Descendant)
test('shan.class', shan.class, WingMaker)
test('shan.danceWaltz()', shan.danceWaltz(), 'wingMaker ' + isDancingDesc)
/**/

console.log(testCount + ' tests. ' + failureCount + ' failed. ' + successCount + ' succeeded.')
