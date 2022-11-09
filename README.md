# FeurApi
API for the 0b0t division of the FeurGroup

# install

you need node.js and npm.

PM2 or screen-gnu is also recommanded but not mandatory.

if you dont know how to install it, google it.

install dependency : 

`npm i`

run the API (with pm2): 

`pm2 start index.js`

for nginx, just proxy_pass it (default port is 4200).

# note

The API by itself is not meant for web use. It is meant to be called through an hacked client like WaifuHax (private).

The password in the index.js is not the one used in prod.

Our current usage of that API is to run tpabots on 0b0t for the FeurGroup.

0b0t is a minecraft anarchy server that have a /tpa command. We run headless minecraft instances that use a special hacked client (WaifuHax), that i'm making so the bots can survive on their own and auto tpy the players that have access to X base.
