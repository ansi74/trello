const webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    path = require('path'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    NODE_ENV = process.env.NODE_ENV

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    resolve: {
        modules: ['src', 'src/components', 'node_modules'],
        extensions: ['*', '.js', '.jsx']
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    ecma: 6,
                    mangle: true,
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'file-loader',
                options: {
                    name() {
                        if (NODE_ENV === 'development') {
                            return 'images/[name]_[hash].[ext]'
                        }

                        return 'images/[hash].[ext]'
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: { minimize: true }
            }
        ]
    },

    devServer: {
        contentBase: './src/tmp',
        port: 4000,
        open: true,
        historyApiFallback: true,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '../') }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            PropTypes: ['prop-types', 'PropTypes'],
            styled: ['styled-components', 'default'],
            css: ['styled-components', 'css'],
            keyframes: ['styled-components', 'keyframes']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: './src/tmp/index.html',
            filename: 'index.html'
        })
    ]
}
