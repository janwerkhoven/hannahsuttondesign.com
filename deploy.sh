#!/usr/bin/env bash

set -e
set -o pipefail

branch=$(git rev-parse --abbrev-ref HEAD)
revision=$(git rev-parse --short HEAD)

echo "----------"
echo "Deploying:"
echo $branch
echo $revision
echo "----------"
echo "scp install.sh deploy@server-singapore.nabu.io:/var/www/hannahsuttondesign.com"
scp install.sh deploy@server-singapore.nabu.io:/var/www/hannahsuttondesign.com
echo "----------"
echo 'ssh deploy@server-singapore.nabu.io "cd /var/www/hannahsuttondesign.com/install.sh $branch $revision"'
ssh deploy@server-singapore.nabu.io "cd /var/www/hannahsuttondesign.com/install.sh $branch $revision"
