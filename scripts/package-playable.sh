#!/bin/bash
set -e

PLUGIN_ROOT="./packages/playable-ads-adpter"

PLUGIN_DIST="./dist"

echo "$(ls)"

cd ".."

cd $PLUGIN_ROOT

echo "$(ls)"

echo "Package 3.x Plugin..."

npm run build -- --environment BUILD_VERSION:3x

cd $PLUGIN_DIST

zip -r -v -9 playable-36x.zip ./playable-ads-adapter

echo "Package 3.x Plugin Finished."

cd ..

echo "Package 2.4.x Plugin..."

npm run build -- --environment BUILD_VERSION:2x

cd $PLUGIN_DIST

zip -r -v -9 playable-24x.zip ./playable-ads-adapter

echo "Package 2.4.x Plugin Finished."