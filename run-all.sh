#!/bin/bash

ttab -d ./html-header npm run start -t "Header Podlet";
ttab -d ./html-footer npm run start -t "Footer Podlet";
ttab -d ./react-main npm run start -t "Main Content Podlet";
ttab -d ./vue-sidebar npm run start -t "Sidebar Podlet";
ttab -d ./layout-server npm run start -t "Layout Server";

