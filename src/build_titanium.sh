#!/bin/sh

# copy context file
cp KiiContext_titanium.ts KiiContext.ts 

# compile
sh compile.sh

# add header and footer
cat header.js.tmp tmp.js footer_titanium.js.tmp > KiiLib.js

# rename
mv KiiLib_base.d.ts KiiLib.d.ts
