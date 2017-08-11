function fetchCategories (self,key) {
    console.log("gettingOptions")
    let modified = self.state[key].slice()
        fetch("http://localhost:8192/getCategories",{method:"GET"})
        .then(data=>{
          return data.json()
        }).then(data=>{
            data.a.forEach(key=>{
              
              modified.push(key)
              
        })
        let newState = {}
        newState[key] = modified
        self.setState(newState)
       }).catch(err=>{
         throw err
       })
}

export default fetchCategories