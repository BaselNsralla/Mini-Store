function fetchCategories (object,key) {
    console.log("gettingOptions")
    let modified = object.state.options.slice()
        fetch("http://localhost:8192/getCategories",{method:"GET"})
        .then(data=>{
          return data.json()
        }).then(data=>{
            data.a.forEach(key=>{
              
              modified.push(key)
              
        })
        let newState = {}
        newState[key] = modified
        object.setState(newState)
       }).catch(err=>{
         throw err
       })
}

export default fetchCategories