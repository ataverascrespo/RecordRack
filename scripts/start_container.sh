#!/usr/bin/bash

set -e

ConnectionStrings=$(aws ssm get-parameter --name "ConnectionStrings" --with-decryption --query "Parameter.Value" --output text)
AppSettings=$(aws ssm get-parameter --name "AppSettings" --with-decryption --query "Parameter.Value" --output text)
CloudinarySettings_ApiKey=$(aws ssm get-parameter --name "CloudinarySettings_ApiKey" --with-decryption --query "Parameter.Value" --output text)
CloudinarySettings_ApiSecret=$(aws ssm get-parameter --name "CloudinarySettings_ApiSecret" --with-decryption --query "Parameter.Value" --output text)
CloudinarySettings_CloudName=$(aws ssm get-parameter --name "CloudinarySettings_CloudName" --with-decryption --query "Parameter.Value" --output text)
SendgridSettings_ApiKey=$(aws ssm get-parameter --name "SendgridSettings_ApiKey" --with-decryption --query "Parameter.Value" --output text)
SendgridSettings_FromEmail=$(aws ssm get-parameter --name "SendgridSettings_FromEmail" --with-decryption --query "Parameter.Value" --output text)
SpotifySettings_ClientID=$(aws ssm get-parameter --name "SpotifySettings_ClientID" --with-decryption --query "Parameter.Value" --output text)
SpotifySettings_ClientSecret=$(aws ssm get-parameter --name "SpotifySettings_ClientSecret" --with-decryption --query "Parameter.Value" --output text)
SqidsSettings_Alphabet=$(aws ssm get-parameter --name "SqidsSettings_Alphabet" --with-decryption --query "Parameter.Value" --output text)

docker run -d -p 5184:5184 --name recordrack recordrack_image -e "ConnectionStrings:DefaultConnection=$ConnectionStrings" "AppSettings:Token=$AppSettings" \
"CloudinarySettings:ApiKey=$CloudinarySettings_ApiKey" "CloudinarySettings:ApiSecret=$CloudinarySettings_ApiSecret" "CloudinarySettings:CloudName=$CloudinarySettings_CloudName" \
"SendgridSettings:ApiKey=$SendgridSettings_ApiKey" "SendgridSettings:FromEmail=$SendgridSettings_FromEmail" "SpotifySettings:ClientID=$SpotifySettings_ClientID" \
"SpotifySettings:ClientSecret=$SpotifySettings_ClientSecret" "SqidsSettings:Alphabet=$SqidsSettings_Alphabet"

