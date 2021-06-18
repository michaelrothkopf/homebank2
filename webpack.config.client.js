const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        "public/js/childDashboard": ["./src/packages/public/js/childDashboard.tsx"],
        "public/js/vendor": ["react", "react-dom"],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "/html/childDashboard.html",
            template: "./src/packages/html/app.html",
            chunks: ["public/js/childDashboard", "public/js/vendor"]
        })
    ]
}