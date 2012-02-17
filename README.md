#A module to provide a functionality as close to the standard OOP inheritance as possible with a bit of my own invention

The descendant's attributes and functions are not overwritten by those of the ancestor at the time of copying ts functions
For Multiple hierarchical inheritance - think twice before you use it. You might be much better off using mixins


###TODO
- Passing arguments to the superFunction
- Inheriting protected functions and properties
- Inheriting from multiple ancestors and preserving the backtrace

###Features
- Static properties and functions are seamlessly inherited together with the instance ones.

- Instances have a reference to their class and thus can call static functions via that class and build the whole hierarchical tree.

- Instances have a special superFunction function that is public and calls the method of their direct ancestor with the context of the instance.

- Already defined functions and properties are not overwritten at the time of inheritance. That means if you define your class first and inherit later, your polymorphic functions will be preserved.

- You can inherit from many sources at the same time. In case of name collisions, the function or property that is defined first, is always preserved. As of yet, backtracking(nor superfunctions reliably) does not work with multiple inheritance.

- If you want to use multiple inheritance(one descendant inherits from many ancestors at the same time), you can, but beware that some funcionality will not work correctly

- Private stuff does not get inherited anyway so nothing to be done there.
