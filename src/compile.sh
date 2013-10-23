tsc KiiContext.ts KiiApp.ts \
KiiUser.ts \
KiiGroup.ts \
KiiBucket.ts \
KiiObject.ts \
kii/KiiAppAPI.ts \
kii/KiiObjectAPI.ts \
kii/KiiACLAPI.ts \
--out KiiLib_base.js \
-d

# remove var kii;
sed -e "s/var Kii;//g" KiiLib_base.js > tmp.js

