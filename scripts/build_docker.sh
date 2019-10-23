#!/bin/bash
set -e

docker login -u $DOCKER_USER -p $DOCKER_PASS
docker build -f Dockerfile -t blockchainit/zokrates-js:latest .
