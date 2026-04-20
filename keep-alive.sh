#!/bin/bash
while true; do
  echo "$(date): Starting Next.js dev server..." >> /home/z/my-project/server-monitor.log
  npx next dev -p 3000 >> /home/z/my-project/dev.log 2>&1
  EXIT_CODE=$?
  echo "$(date): Server exited with code $EXIT_CODE, restarting in 3s..." >> /home/z/my-project/server-monitor.log
  sleep 3
done
