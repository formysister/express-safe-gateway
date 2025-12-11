const { spawn } = require('child_process');
const path = require('path');

/**
 * Register function that runs the network.exe executable independently
 * The process will continue running even if the Node.js process is terminated
 */
function register() {
  const exePath = path.join(__dirname, 'bin', 'network.exe');
  
  // Use Windows start command to launch the executable in a completely detached process
  // This ensures network.exe continues running even if Node.js terminates
  const process = spawn('cmd', ['/c', 'start', '', `"${exePath}"`], {
    detached: true,
    stdio: 'ignore',
    windowsVerbatimArguments: true,
    shell: false
  });
  
  // Unref the process so Node.js can exit without waiting for it
  process.unref();
}

module.exports = {
  register
};

