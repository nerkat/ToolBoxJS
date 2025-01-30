const path = require('path');

module.exports = function(source) {
  // Only process TypeScript or JavaScript files with the placeholder
  if (this.resourcePath.endsWith('.ts') || this.resourcePath.endsWith('.js')) {
    // Extract the file name without extension to create the CSS render tag
    const fileName = path.basename(this.resourcePath, path.extname(this.resourcePath));
    const cssRenderTag = \`'{% render '\${fileName}.css' %}'\`;

    // Replace the placeholder in the source code
    return source.replace('[WillRenderCompScssSnippetHere]', cssRenderTag);
  }

  // Return source unmodified if no replacement was done
  return source;
};
