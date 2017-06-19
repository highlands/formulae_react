#!/bin/bash

echo "1) Run babel on the src/output_lib directory, copying the files to the
lib directory.\n\n" &&
babel src/output_lib --out-dir lib --copy-files &&

echo "\n2) Copy the css to the lib directory.\n\n" &&
mkdir -p lib/css
cp src/css/index.css lib/css/
cp src/css/postcss.config.js lib/css/
