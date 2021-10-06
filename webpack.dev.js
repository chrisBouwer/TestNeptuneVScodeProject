const path = require('path');
const webpack = require('webpack');
const classPropPlugin = require.resolve("@babel/plugin-proposal-class-properties");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path');
const fs = require('fs');
const { planet9Proxy } = require('planet9-vscode-tool')

/**@returns {import('webpack').Configuration}*/
module.exports = async function Configuration() {
    return {
        mode: 'development',
        entry: {
            main: './src/index.tsx',
        },
        devtool: "source-map",
        devServer: {
            contentBase: false,
            compress: true,
            port: 9000,
            proxy: await planet9Proxy(),
            open: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: resolve('./public/index.html'),
            }),
        ],
        resolve: {
            alias: {
                'planet9-internal': path.resolve(__dirname, '.planet9/apis/')
            },
            extensions: ['.tsx', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                    include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, '.planet9')],
                    exclude: [/node_modules/]
                },
                {
                    test: /.css$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        }
    }
}