import { spawnSync, execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('=== CUSTOM BUILD SCRIPT START ===');

// Run next build
const result = spawnSync('npx', ['next', 'build'], {
  stdio: 'inherit',
  encoding: 'utf-8',
  env: { ...process.env }
});

console.log('=== next build exit code:', result.status, '===');

// Exhaustive diagnostics
const dirs = [
  '.next',
  '.next/diagnostics',
  '.next/server',
  '.next/server/app',
  '.next/server/app/api',
  '.next/build',
  '.next/cache',
];

for (const dir of dirs) {
  if (existsSync(dir)) {
    try {
      const out = execSync(`ls -laR ${dir} 2>&1`, { encoding: 'utf-8' });
      console.log(`=== ${dir} ===`);
      console.log(out.slice(0, 3000));
    } catch (e) {
      console.log(`=== ${dir} (error listing) ===`);
    }
  }
}

// Check for any log files
try {
  const logSearch = execSync('find .next -name "*.log" -o -name "*.txt" -o -name "diagnostics*" 2>/dev/null | head -20', { encoding: 'utf-8' });
  console.log('=== Log files found ===');
  console.log(logSearch);
  
  // Read each log file
  for (const logFile of logSearch.trim().split('\n').filter(Boolean)) {
    try {
      const content = execSync(`cat "${logFile}" 2>&1`, { encoding: 'utf-8' });
      console.log(`=== ${logFile} ===`);
      console.log(content.slice(0, 2000));
    } catch (e) {}
  }
} catch (e) {}

// Check if the db file actually exists
try {
  const dbCheck = execSync('ls -la db/ 2>&1', { encoding: 'utf-8' });
  console.log('=== db/ directory ===');
  console.log(dbCheck);
} catch(e) {
  console.log('=== db/ directory NOT FOUND ===');
}

// Try to read the .next/diagnostics directory
try {
  const diag = execSync('find .next/diagnostics -type f 2>/dev/null', { encoding: 'utf-8' });
  console.log('=== Diagnostics files ===');
  console.log(diag);
  for (const f of diag.trim().split('\n').filter(Boolean)) {
    try {
      const content = execSync(`cat "${f}" 2>&1`, { encoding: 'utf-8' });
      console.log(`=== ${f} ===`);
      console.log(content.slice(0, 5000));
    } catch(e) {}
  }
} catch(e) {}

process.exit(result.status || 0);
