#!/usr/bin/bash

set -e

docker run -d -p 5184:5184 --name recordrack recordrack_image -e
