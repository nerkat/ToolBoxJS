// webpack.multi.config.js
module.exports = [
    require('./webpack.general.config.js'),
    require('./webpack.js.config.js'),
    require('./webpack.css.config.js'),
];
