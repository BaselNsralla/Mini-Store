
module.exports = {

  entry : "./client/js/reactHome.js",
  output:{
    path:__dirname+"/client/js",
    filename: "reactHome_c.js"
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
