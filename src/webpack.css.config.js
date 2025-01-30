const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Dynamically get all .css and .scss files in css/assets
const cssFiles = glob.sync(path.resolve(__dirname, 'css/assets/*.{css,scss}'));

module.exports = {
    entry: cssFiles.reduce((entries, file) => {
        const name = path.basename(file, path.extname(file)); // Use filename as the entry key
        entries[name] = file;
        return entries;
    }, {}),
    output: {
        path: path.resolve(__dirname, 'assets'), // Output directory for CSS files
    },
    module: {
        rules: [
            // CSS and SCSS files
            {
                test: /\.(css|scss)$/,
                include: path.resolve(__dirname, 'css/assets'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader', // Compiles SCSS to CSS
                        options: {
                            implementation: require('sass'),
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style-[name].css', // Adds 'style-' prefix to each CSS file
        }),
    ],
    resolve: {
        extensions: ['.css', '.scss'],
    },
    mode: 'production', // or 'development' for debugging
    optimization: {
        minimize: true, // Enables minimization for production
        runtimeChunk: false,
        splitChunks: false, // Prevent Webpack from creating additional chunks
    },
    // Ignore .js files in the final output
    performance: {
        hints: false, // Disable performance hints to avoid output size warnings
    },
};

// Webpack ignore emitted .js files
module.exports.plugins.push({
    apply: (compiler) => {
        compiler.hooks.emit.tap('RemoveJsFiles', (compilation) => {
            Object.keys(compilation.assets).forEach((asset) => {
                if (asset.endsWith('.js')) {
                    delete compilation.assets[asset];
                }
            });
        });
    },
});
