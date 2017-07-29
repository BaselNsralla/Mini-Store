const http = require('http'),
      fs = require('fs'),
      path = require('path');
const ds = require("deepstream.io-client-js")
let client = ds("localhost:8000/deepstream").login()
let getCategories = (res) =>{
    console.log("get CATEGORIES")
    let record = client.record.getRecord("store")
    res.writeHead(200,{"Content-type":"application/json"})
    var responseObject =  {a:[]}
    record.whenReady(()=>{
      Object.keys(record.get()).forEach(function(element) {
        console.log(element)
        responseObject.a.push(element)
      });
      
      res.end(JSON.stringify(responseObject))
    })

    //TODO return data fetched from database as a json object to the createFrom
}


/* 
^\/find$|^\/find\/[a-z]*$
/find sen slut eller /find/något ord eller /find/
*/
http.createServer((req,res)=>{

  console.log(req.url);
  if (req.url.match(/^\/find$|^\/find\/[a-z]*$/g)) {
    let category = req.url.split("/")[2]||"All"
    res.writeHead(200,{"Content-Type": "text/html"})
    getContent(category,res)
  }else if (req.url.match(/^\/make$/g)) {
      res.writeHead(200,{"Content-Type": "text/html"})
      p =  path.join(__dirname,"create/create.html")
      const readStream = fs.createReadStream(p)
      readStream.pipe(res)
      readStream.on("end",()=>{

        res.end()
      })
  }else if(req.url.match(/^\/getCategories$/g)){
      getCategories(res)
     
  }else if(req.url.match(/.js$/g)){
    //TODO return the js files related, i have to change the webpack 
    //entry and output
    let file = req.url,
        p = path.join(__dirname,file),
        readStream  =fs.createReadStream(p)
        readStream.pipe(res)
         readStream.on("end",()=>{
           res.end()
        })
   }

}).listen("8192")




let answer = (res,record) =>{
  if (record==undefined) {
    res.write(`<h1>Subject not found</h1>`)
    res.end()
    return
  }

  allData = record.get()
  console.log(allData);

}


let getContent = (category,res) => {
  let path = "store/"+category
  client.record.has(path,(err,has)=>{
    if (has) {
      record = client.record.getRecord(path)
      record.whenReady(()=>{
        answer(res,record)
      })
    }else {
        answer(res)
    }
  })
}
