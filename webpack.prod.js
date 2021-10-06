const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getProjectName } = require('planet9-vscode-tool');

/**@type {import('webpack').Configuration}*/
module.exports = async function Configuration() {
    return {
        mode: 'production',
        entry: {
            main: './src/index.tsx',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: `/webapp/${await getProjectName()}`
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve('./public/index.html'),
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
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
    }
}