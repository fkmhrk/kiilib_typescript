#!/bin/sh

# copy context file
cp KiiContext_titanium.ts KiiContext.ts 

tsc KiiContext.ts KiiUser.ts \
kii/KiiAppAPI.ts \
--out KiiLib_base.js \
-d

# remove var kii;
sed -e "s/var Kii;//g" KiiLib_base.js > tmp.js 
cat header.js tmp.js footer_titanium.js > KiiLib.js

# rename
mv KiiLib_base.d.ts KiiLib.d.ts
