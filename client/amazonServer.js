const http = require('http');
const fs = require('fs');
const path = require('path');
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
      const readStream = fs.createReadStream(path.join(__dirnam,"create/create.html"))
      readStream.pipe(res)
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
