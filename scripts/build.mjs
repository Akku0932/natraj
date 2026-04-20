import { spawnSync } from 'child_process';

console.log('=== CUSTOM BUILD SCRIPT START ===');
console.log('Node version:', process.version);
console.log('CWD:', process.cwd());
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Use spawnSync for separate stdout/stderr capture
// Use --webpack to bypass potential Turbopack issues on Vercel
const result = spawnSync('npx', ['next', 'build', '--webpack'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  encoding: 'utf-8',
  maxBuffer: 50 * 1024 * 1024,
  env: { ...process.env }
});

if (result.stdout) {
  console.log('=== STDOUT ===');
  console.log(result.stdout);
}

if (result.stderr) {
  console.log('=== STDERR ===');
  console.log(result.stderr);
}

console.log('=== Exit code:', result.status, '===');
console.log('=== Signal:', result.signal, '===');

if (result.error) {
  console.error('=== SPAWN ERROR ===');
  console.error(result.error);
}

if (result.status !== 0) {
  process.exit(result.status || 1);
}
