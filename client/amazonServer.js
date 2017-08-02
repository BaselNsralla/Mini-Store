const http = require('http'),
      fs = require('fs'),
      path = require('path');
const ds = require("deepstream.io-client-js")
let client = ds("localhost:8000/deepstream").login()
let qs = require("querystring")
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

  if(req.method == "POST"){
    if(req.url == "/create/addItem"){
      let body = ""
      req.on('data',(data)=>{
        body+= data
      })
      req.on("end",()=>{
        body = qs.parse(body)
        console.log(body)
        if (validateItem(body)){
          appendItemToDb(body)
        }else {
          //retunera och förmedla felet
          res.end()
        }
      })

    }

  }else if (req.method == "GET"){
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


let appendItemToDb = (item) => {


}


let validateItem = (body) => {
  let nonDgit = new RegExp(/\D/g)
  let nonWordOrDigit = new RegExp(/\W/g)
  let moreThanOneChar = new RegExp(/.{2}/g)
  if(regexValidation("name",nonWordOrDigit,body)&&
     regexValidation("price",nonDgit,body)&&
     regexValidation("currency",moreThanOneChar,body)&&
     regexValidation("option",nonWordOrDigit,body)){
      return true
  }else {
      return false
  }
}


let regexValidation = (key, regex,body) => {
  if (body[key]!=undefined && body[key]!="" && body[key]!=null){
    if(body[key].match(regex)){
      return false
    }else {
      return true
    }

  }
  return false

} 