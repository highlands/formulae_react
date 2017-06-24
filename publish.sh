#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Usage: ./publish.sh 0.1.1"
    exit 1
fi

git tag -a v$1 -m "Tagging $1" &&
git push origin --tags &&
npm publish
