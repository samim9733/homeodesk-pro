#!/bin/bash
# Persistent server for HomeoDesk Pro preview
cd /home/z/my-project/homeodesk-pro/dist
while true; do
    python3 -m http.server 3000 2>/dev/null
    sleep 1
done
