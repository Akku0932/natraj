import { execSync } from 'child_process';

console.log('=== CUSTOM BUILD SCRIPT START ===');
console.log('Node version:', process.version);
console.log('CWD:', process.cwd());
console.log('DATABASE_URL:', process.env.DATABASE_URL);

try {
  execSync('npx next build 2>&1', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('=== BUILD SUCCEEDED ===');
} catch (e) {
  console.error('=== BUILD FAILED ===');
  console.error('Exit code:', e.status);
  console.error('Signal:', e.signal);
  if (e.stdout) console.error('STDOUT:', e.stdout.toString().slice(-2000));
  if (e.stderr) console.error('STDERR:', e.stderr.toString().slice(-2000));
  process.exit(1);
}
