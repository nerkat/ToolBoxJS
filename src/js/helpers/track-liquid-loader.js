const path = require('path');
const fs = require('fs');

module.exports = function (source) {
  // Get the current TypeScript file's path and base name
  const tsFilePath = this.resourcePath;
  const componentName = path.basename(tsFilePath, path.extname(tsFilePath));

  // Find the corresponding .liquid file in the same directory
  const liquidFilePath = path.join(path.dirname(tsFilePath), '\${componentName}.liquid');

  // Check if the .liquid file exists and add it as a dependency
  if (fs.existsSync(liquidFilePath)) {
    this.addDependency(liquidFilePath);
  }

  return source; // Return the original TypeScript source
};
