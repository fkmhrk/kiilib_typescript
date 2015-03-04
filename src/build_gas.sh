#!/bin/sh

# copy context file
cp KiiContext_gas.ts KiiContext.ts 

# compile
sh compile.sh

# add header
cat header.js.tmp tmp.js > KiiLib-gas.js

# rename
mv KiiLib_base.d.ts KiiLib.d.ts
