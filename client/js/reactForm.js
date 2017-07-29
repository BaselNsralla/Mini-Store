import React from 'react';
import ReactDOM from 'react-dom';
//vi testar utan ds här
console.log("aaaa")

class Category extends React.Component {

  constructor () {
    super()
   
  
    this.state = {
      options : ["ape"],
      alfa : ["aaass"]
    }
    this.getOptions()
    
  }
  getOptions =  () => {
    console.log("gettingOptions")
        fetch("http://localhost:8192/getCategories")
        .then(data=>{
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          data = JSON.parse(data)
          return data.a
        }).then(data=>{
            data.forEach(key=>{
                this.setState({
                options:this.state.options.push(key)

              })
           
           

         })
       })
      }
  
  


  directOptions = () => {
    return this.state.options.map(a=>{
      return(
          <option>{a}</option>

      )

    })


  }
 

  render () {
     console.log("something")
    return (
      <div>
        <select>
          {this.directOptions()}
        </select>
     </div>
    )
  }
}



class Form extends React.Component {
  getForm = ()=> {
    
    return (

      <form id="form" method="post" action="/createProduct">
        
          <h3>Category</h3>
        

          <h3>Name:</h3>
          <input type="text"/>

          <h3>Price:</h3>
          <input type="text"/>
          <input type="submit" value="send"/>
        
      </form>

    )

  }

  render (){
    console.log("ok")
    return (
      <div id="formContainer">
        <h1>Create Product</h1>
          <Category  />
        {this.getForm()}
      </div>
    )


  }


}


ReactDOM.render(
  <Form />,
  document.getElementById('root')
)
