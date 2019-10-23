#!/bin/bash
set -e

docker build -f Dockerfile -t blockchainit/zokrates-js:latest .
