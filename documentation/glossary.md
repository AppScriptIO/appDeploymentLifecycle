# Vocabulary
- **toolchain**: set of packages used to achieve a common purpose.
- **script config object**: is the object that holds the settings used in order to run a script, from the path of the script to the way to require it (module, immediate execution, etc.)...
- **client interface**: an entrypoint in which the app is exposed through, that parameters can be passed to.
- **container scripts**: are node modules used as container entrypoints (usually during `build dockerfile` commands), which will assist in deployment of containers (install programs and build container images).
- **Programmatic/library API**: is the interface provided that exposes functions that can allows control of the program using code.
- **CLI**: is the interface providing input/command interpretation for controlling a program.

## Notes: 
- project that do not use a version will contain `independent` as the version value.