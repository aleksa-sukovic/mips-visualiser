#!/bin/bash

if [ -d "/var/www/node_modules" ]; then
  ng serve --host 0.0.0.0
fi

tail -f /dev/null
