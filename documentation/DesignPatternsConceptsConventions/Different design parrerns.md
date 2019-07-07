## Design Patterns




- A concept of prototype chain where constructors could be instantiated separately, creating a prototype chain with objects that are not strictly attached by a first contructor call. 
e.g. 
    ```
    let pluginContext = new PluginContext()
    let cacheContext = new CacheContext()
    // will create a chain with parameter objects involved.
    let controller = new Controller({ cacheContext, pluginContext })
    // will create a chain with parameter objects involved where one of them is dynamically changed, and the rest are shared accross "controler" instances.
    let controller = new Controller({ new CacheContext(), pluginContext })
    ```
    What the current behaviour of Javascript prototypal inheritance is that constructor creates a single object that delagates to constructor prototypes. What is missing is a way to allow delegation to upper dynamically created objects that relate to superconstructors (upper level classes) when needed. This allows to share context between specific instances and divide them into groups that do not affect each other and are soft linked (i.e. the shared context can be garbage collected like the instances that are part of it).


- Class generators - wrapping classes with functions allows generating classes on demand that extend a variable superclass. This is a pattern common in ES6 classes, probably because of the constraints ES6 sets.
