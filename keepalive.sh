#!/bin/bash
# Keep-alive script for Next.js dev server
while true; do
  sleep 10
  if ! ss -tlnp | grep -q 3000; then
    echo "$(date): Server not running, starting..." >> /home/z/my-project/keepalive.log
    cd /home/z/my-project
    nohup node --max-old-space-size=1024 node_modules/.bin/next dev -p 3000 </dev/null >> /home/z/my-project/dev.log 2>&1 &
    disown
    sleep 10
  fi
done
