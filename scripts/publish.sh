#!/bin/bash

npm install -g npm-cli-login
NPM_USER=$USER NPM_PASS=$PASS NPM_EMAIL=$EMAIL npm-cli-login

npm install -g publish
npm version patch --force --commit-hooks=false --no-git-tag-version
npm publish