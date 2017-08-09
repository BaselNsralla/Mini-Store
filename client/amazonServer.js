const http = require('http'),
      fs = require('fs'),
      path = require('path')
      formidable = require("formidable");
const ds = require("deepstream.io-client-js")
let client = ds("localhost:8000/deepstream").login()
let qs = require("querystring")
let readStream = require("stream").PassThrough
/* 
^\/find$|^\/find\/[a-z]*$
/find sen slut eller /find/något ord eller /find/
*/
http.createServer((req,res)=>{

  if(req.method == "POST"){
    if(req.url == "/create/addItem"){
      let body = ""
      // req.on('data',(data)=>{
      //   body+= data
      // })
      //req.on("end",()=>{
        let formHandler = formidable.IncomingForm();
        //body = JSON.parse(body)

        formHandler.parse(req,(err,fields,files)=>{
          let pic = files.pic
              tempPath = pic.path;
              upploadPath = `${__dirname}/images/${pic.name}`

          fs.rename(tempPath, upploadPath, err=>{
            if (err) throw err;
          })    
          console.log("========")
          let body = fields
          body["imagePath"] = upploadPath
          if (validateItem(body)){
            itemToDb(body)
            
            
            console.log("secure")
            //redirect to admin page
            res.end()
          }else {
            console.log("UNsecure")  
              //retunera och förmedla felet
            res.end()
          }
        })
     
      //})
    }

  }else if (req.method == "GET"){
      if (req.url.match(/^\/find$|^\/find\/[a-z]*$/gi)) {
      let category = req.url.split("/")[2]||"All"
      res.writeHead(200,{"Content-Type": "text/html"})
      getContent(category,res)
    }else if (req.url.match(/^\/create$/gi)) {
        res.writeHead(200,{"Content-Type": "text/html"})
        p =  path.join(__dirname,"create/create.html")
        const readStream = fs.createReadStream(p)
        readStream.pipe(res)
        readStream.on("end",()=>{
          res.end()
        })
    }else if(req.url.match(/^\/getCategories$/gi)){
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
    }else if (req.url.match(/^\/body$/gi)){
     //TODO  return body
      let rs = new readStream()
      res.writeHead(200,{"Content-type":"application/json"})
      rs.pipe(res)
      getAllItems(rs,(allItems)=>{
        //gör en stream av allItems o pipa den i din response
        
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


let itemToDb = (item) => {
  client.record.has(`store/${item.option}`,
    (err,has)=>{
      if(has){
         appendItemToRecord(item)  
      }else {
         appendKey(item)

      }
    })
}


let appendKey = (item) =>{
  let keys = client.record.getRecord(`store/keys`)
  keys.whenReady(()=>{
    let allKeys = keys.get("all")
    allKeys.push(item)
    keys.set("all",allKeys)
    appendItemToRecord(item)        
  })
}


let appendItemToRecord = (item)=>{
  let record = client.record.getRecord(`store/${item.option}`)
  record.whenReady(()=>{
    delete item.option
    record.set(client.getUid(),item)
 })  
}


let validateItem = (body) => {
  let nonDgit = new RegExp(/\D/g)
  let nonWordOrDigit = new RegExp(/[^a-zA-Z\d\s:]/gu)
  let moreThanOneChar = new RegExp(/.{2}/gu)
  let nonPathyChars = new RegExp(/[^\w\/\\]/gui)
  if(regexValidation("name",nonWordOrDigit,body)&&
     regexValidation("price",nonDgit,body)&&
     regexValidation("currency",moreThanOneChar,body)&&
     regexValidation("option",nonWordOrDigit,body)&&
     regexValidation("imagePath",nonPathyChars,body)){
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

let getCategories = (res) =>{
    console.log("get CATEGORIES")
    let record = client.record.getRecord("store/keys")
    res.writeHead(200,{"Content-type":"application/json"})
    var responseObject =  {a:[]}
    record.whenReady(()=>{
      let keysArray = record.get().all
      keysArray.forEach((element)=> {
        console.log(element)
        responseObject.a.push(element)
      });
      
      res.end(JSON.stringify(responseObject))
    })
}

let getAllItems = (rs,callback)=>{
  let record = client.record.getRecord(`store/keys`)
  record.whenReady(()=>{
    let keys = record.get("all")
  /// v:__ skapa eventEmitter objectet
  //keys forEach append the returned record to response body which will be sent to the callBACK argument
    let allData = {}
    let end = keys.length -1 
    rs.push("{")
    keys.forEach((key,i)=>{
      let r = client.record.getRecord(`store/${key}`)
      r.whenReady(()=>{
        let rawItems = r.get()
        let storeItems = rawItems
        let stringified = JSON.stringify(storeItems)
        allData[key] = storeItems
        let coma = i==end?"":","
        rs.push(`"${key}":${stringified}${coma}`)

        /// v:__ emitta data med datan varje gång du pushar data 
        if (i==end) {
          callback(allData)
          rs.push("}")
          rs.push(null)
        }
      })

    })

  })
  
}


