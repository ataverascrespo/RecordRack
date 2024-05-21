#!/usr/bin/bash

set -e

# Navigate to repo and pull latest changes 
cd /home/ec2-user/repos/RecordRack
git pull origin

# Build the Docker image
docker build -t recordrack_image -f Dockerfile .

