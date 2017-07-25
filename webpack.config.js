
module.exports = {
  entry : "./client/create/reactForm.js",
  output:{
    path:__dirname+"/client/create",
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
         presets: ["babel-preset-env","babel-preset-react","babel-preset-stage-0"]
       }
     }

   ]

 },



}
