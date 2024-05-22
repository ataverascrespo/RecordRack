#! usr/bin/bash

set -e

# Get the container ID
CONTAINER_IDS=$(docker ps -aqf "name=recordrack")

# loop through each container Id to remove it
for CONTAINER_ID in $CONTAINER_IDS; do
        docker rm -f "$CONTAINER_ID" || true
done
