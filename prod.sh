#!/usr/app/env bash

set -e

export DB_CONNECTION=$(echo $DB_CONNECTION)
export NODE_ENV=production

docker build -t sova2 .
docker run -p 49160:8081 -d sova2
