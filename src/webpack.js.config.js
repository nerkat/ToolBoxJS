const path = require('path');
const glob = require('glob');

module.exports = {
    // Dynamically get all .js and .ts files in js/assets
    entry: glob.sync(path.resolve(__dirname, 'js/assets/*.{js,ts}')).reduce((entries, file) => {
        const name = path.basename(file, path.extname(file)); // Use filename as the entry key
        entries[name] = file;
        return entries;
    }, {}),
    output: {
        path: path.resolve(__dirname, 'assets'), // Output directory for JS/TS files
        filename: 'script-[name].js', // Adds 'script-' prefix to each JS/TS file
    },
    module: {
        rules: [
            // Source map loader
            {
                test: /\.js$/,
                enforce: "pre",
                use: [
                    {
                        loader: "source-map-loader",
                        options: {
                            filterSourceMappingUrl: (url, resourcePath) => {
                                if (/broker-source-map-url\.js$/i.test(url)) return false;
                                if (/keep-source-mapping-url\.js$/i.test(resourcePath)) return "skip";
                                return true;
                            },
                        },
                    },
                ],
            },
            // TypeScript loader
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            // JavaScript loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'], // Allow importing without extensions
    },
    mode: 'production', // or 'development' for debugging
    optimization: {
        minimize: false,
    },
    devtool: 'source-map', // Generate source maps
};
