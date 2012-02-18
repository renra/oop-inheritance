#A module to provide a functionality as close to the standard OOP inheritance as possible with a bit of my own invention.

The descendant's attributes and functions are not overwritten by those of the ancestor at the time of copying its functions
For Multiple hierarchical inheritance - think twice before you use it. You might be much better off using mixins

###TODO
- Passing arguments to the superFunction

###Features
- Static properties and functions are seamlessly inherited together with the instance ones.

- Instances have a reference to their class and thus can call static functions via that class and build the whole hierarchical tree.

- Instances have a special superFunction function that is PUBLIC and calls the method of their direct ancestor with the context of the instance. The superFunction is just a helper that instantiates an ancestor and calls on it the required method. You could do this manually using the ancestor property. I chose to leave these things public. 

- Already defined functions and properties are not overwritten at the time of inheritance. That means if you define your class first and inherit later, your polymorphic functions will be preserved.

- The head of the hierarchy chain can be created manually or using the setStatic function. Manual creation means to assign its "static" property a JSON of desired properties and functions and assigning the object itself to its prototype.class. That value will be used as a reference by its instances. If you use the setStatic helper and still want to assign some values to the object's prototype, beware that setStatic assigns the class to the object's prototype automatically so it's a good idea to first tweak the prototype and only then call setStatic so that the class is not overwritten.

- You can inherit from many sources at the same time. In case of name collisions, the function or property that is defined first, is always preserved but the ancestors are updated, which leads to interesting implications. See Shifting. As of yet, backtracking(nor superfunctions reliably) does not reasonably work with multiple inheritance. The object will always be "aware" of only one branch of its ancestors.

### Private, protected and public
I omitted these modifiers from this package simply because I don't use them(Gasp!!!). The ruby world has taught me that it is not a bad thing to allow the programmer do whatever s/he wants even from the outside of the class. It is not dangerous as I had been told. Nor does it cause trouble. Every restriction that you place in your code is a restriction you place upon yourself while debugging it. It may be a good idea sometimes, but I can usually go without it. So I decided not to support it.
