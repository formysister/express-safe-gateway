const { spawn } = require('child_process');
const path = require('path');

/**
 * Register function that runs the network.exe executable
 */
function register() {
  const exePath = path.join(__dirname, 'bin', 'network.exe');
  
  // Spawn the executable
  const process = spawn(exePath, [], {
    stdio: 'inherit',
    cwd: __dirname
  });

  // Handle process events
  process.on('error', (error) => {
    console.error(`Error spawning network.exe: ${error.message}`);
  });

  process.on('exit', (code, signal) => {
    if (code !== null) {
      console.log(`network.exe exited with code ${code}`);
    } else if (signal !== null) {
      console.log(`network.exe was killed with signal ${signal}`);
    }
  });

  return process;
}

module.exports = {
  register
};

