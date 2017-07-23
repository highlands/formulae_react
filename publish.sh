#!/bin/bash
if [ $# -eq 0 ]
  then
    echo "Usage: ./publish.sh 0.1.1"
    exit 1
fi

read -p "Did you run yarn lib? Please, make sure you did it before publishing...
(y/n)" -n 1 -r

if [[  $REPLY =~ [Yy]$ ]]
then
  git tag -a v$1 -m "Tagging $1" &&
  git push origin --tags &&
  npm publish
fi

