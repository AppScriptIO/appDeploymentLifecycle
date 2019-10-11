# Commandline interface
- Command line interface functions or entrypoints should consider the following variables (API of accepted varibales from (priority list)): 
   1.  immediately passed argument in code. 
   2.  passed environment variables
   3.  CLI arguments

Where this allows for consistent implementations and ability to test the code by differnet ways of invocation.

# Concept: integration/reconciling between commandl line interface (CLI) and an application programming interface (API)
Solving a problem in which running a program from the CLI or running a CLI commands from a program (new process) requires manually exposing commands and arguments through the CLI. Basically creating an interface for the command line that supports calling the program with parameters, i.e. mapping CLI arguments and commands to the program`s functionality. Calling an API program from the command line requires creating a command line interface for it.
- One colution could be automatically mapping of the program`s functions to command line instructions, i.e. the CLI will be created on the fly exposing functions from the API.
- Another solution could be supporting usage of the API inside the CLI using the same program's language (Javascript). Essentially evaluating the Javascript API calls from the commandline arguments. Solving the parsing stage of arguments and mapping them to the program. e.g. close to the way Windows 10 API is exposed in the Powershell command-line. 

_Examples / options to consider:_
   - `$ ./script.js "().<moduleName>({ parameter: '1' })"`
      
      i.e. `$ <scriptPath> "<script to evaluate>"` will match => `require(<scriptPath>)<js to evaluate>` or `$ node -e "require(<path>)<evalscript>"`
   - `run <scriptKey> <eval>` // a way to run a script with javascript code in commandline.

_Thing to consider is dealing with a way to specify runtime options (node flags) for executing scripts:_
   - `run <nodeOptions> <script>`
   - `node <flags> run <script>`
   - `run <node flags> --<run flags> <script>`
   - `run ({ nodeFlag: true, scriptKey: 'sleep' })({ <script params> })`


- `scriptLookup <scriptName> | runScript <options/js eval>` => where first section pipes the script config found or path and the second executes it.