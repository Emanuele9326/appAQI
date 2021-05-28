
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
module.exports={

  stats:{
    children:true,
  },
  entry:{
    app:["@babel/polyfill",'./src/JS/aqi.js'],
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
           options:{minimize:false},
          }
        ]
      },
      {
        test:/\.css$/i,
        use:[MiniCssExtractPlugin.loader,"css-loader"],
      },
      {
        test:/\.(png|svg|jpg|jpeg|gif)$/i,
        type:'asset/resource',
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
        filename:"./CSS/[name].css",
      }
    ),
    new CleanWebpackPlugin(),
  ],
};
