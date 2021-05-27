
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
module.exports={
  mode:'development',

  stats:{
    children:true,
  },
  entry:{
    app:["@babel/polyfill",'./src/aqi.js'],
  },
  devtool:'inline-source-map',

  output:{
    filename:'bundle.js',
    path: path.resolve(__dirname,'dist'),
  },
  module:{

    rules:[
      {
        test:/\.js$/i,
        exclude:/node_modules/,
        use:{
          loader:"babel-loader"
        }
      },
      {
        test:/\.html$/i,
        use:[
          {
           loader:"html-loader",
           options:{minimize:true},
          }
        ]
      },
      {
        test:/\.css$/i,
        use:[MiniCssExtractPlugin.loader,"css-loader"],
      }

    ]
  },
  plugins:[
    new HtmlWebpackPlugin(
        {
          template:"./src/index.html",
          filename:"./index.html"
        }
    ),
    new MiniCssExtractPlugin(
      {
        filename:"[name].css",
        chunkFilename:"[id].css",
      }
    ),
    new CleanWebpackPlugin(),
  ],
};
