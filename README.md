kiilib_typescript
=================

KiiCloud library for TypeScript

Documentation
=============

https://fkmhrk.github.io/kiilib_typescript/docs/

Currently supported only Japanese. 

How to build
============
in both build, KiiLib.d.ts will be generated.

# jQuery (for web application)

```
$ git clone git@github.com:fkmhrk/kiilib_typescript.git kiilib
$ cd kiilib/src
$ sh build_jquery.sh
$ cp KiiLib.js <path to your web application>
```


# Titanium

```
$ git clone git@github.com:fkmhrk/kiilib_typescript.git kiilib
$ cd kiilib/src
$ sh build_titanium.sh
$ mkdir <path to your titanium project>/app/lib
$ cp KiiLib.js <path to your titanium project>/app/lib
```
