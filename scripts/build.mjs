import { execSync } from 'child_process';

console.log('=== CUSTOM BUILD SCRIPT START ===');
console.log('Node version:', process.version);
console.log('CWD:', process.cwd());
console.log('DATABASE_URL:', process.env.DATABASE_URL);

try {
  // Capture output instead of inheriting, so we can see everything
  const output = execSync('npx next build 2>&1', { 
    encoding: 'utf-8',
    maxBuffer: 50 * 1024 * 1024,
    env: { ...process.env }
  });
  console.log(output);
  console.log('=== BUILD SUCCEEDED ===');
} catch (e) {
  // Print ALL captured output
  if (e.stdout) {
    console.log('=== CAPTURED STDOUT ===');
    console.log(e.stdout);
  }
  if (e.stderr) {
    console.log('=== CAPTURED STDERR ===');
    console.log(e.stderr);
  }
  console.error('=== BUILD FAILED ===');
  console.error('Exit code:', e.status);
  console.error('Signal:', e.signal);
  process.exit(1);
}
