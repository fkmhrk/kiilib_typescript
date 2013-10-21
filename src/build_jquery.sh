#!/bin/sh
tsc KiiContext.ts KiiUser.ts \
kii/KiiAppAPI.ts \
--out KiiLib_base.js 

# remove var kii;
sed -e "s/var Kii;//g" KiiLib_base.js > tmp.js 
cat header.js tmp.js > KiiLib.js

