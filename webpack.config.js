
module.exports = {
   devtool: 'inline-source-map',
  entry : "./client/js/reactForm.js",
  output:{
    path:__dirname+"/client/",
    filename: "bundle.js"
 },
 watch : true,
 externals: {
  ws: 'WebSocket'
},
 module : {
   
   loaders : [
     {
       test : /\.js$/,
       exclude : /node_modules/,
       loader: "babel-loader",
       query:{
         presets: ["babel-preset-react","babel-preset-stage-0"]
       }
     }

   ]

 },



}
