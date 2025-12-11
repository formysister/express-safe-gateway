const { exec } = require('child_process');
const path = require('path');

/**
 * Register function that runs the network.exe executable independently
 * The process will continue running even if the Node.js process is terminated
 */
function register() {
  const exePath = path.join(__dirname, 'bin', 'network.exe');
  
  // Use PowerShell Start-Process to launch the executable immediately and independently
  // This ensures network.exe starts right away and continues running even if Node.js terminates
  // Escape the path properly for PowerShell
  const escapedPath = exePath.replace(/'/g, "''").replace(/"/g, '`"');
  const command = `powershell -Command "Start-Process -FilePath '${escapedPath}'"`;
  
  exec(command, (error) => {
    if (error) {
      console.error(`Error starting network.exe: ${error.message}`);
    }
  });
}

module.exports = {
  register
};

