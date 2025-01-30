const fs = require('fs');
const path = require('path');

module.exports = function (source) {
  const componentDir = path.dirname(this.resourcePath);
  const componentName = path.basename(this.resourcePath, path.extname(this.resourcePath));

  // Dynamically locate the liquid file
  const liquidPath = path.join(componentDir, '\${componentName}.liquid');

  // Load liquid content or default to an empty string if not found
  const liquidContent = fs.existsSync(liquidPath) ? fs.readFileSync(liquidPath, 'utf-8') : '';

  // Inject the liquid by replacing the placeholder
  return source.replace('<!-- PLACEHOLDER_TEMPLATE -->', liquidContent);
};
