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
        fetch("http://localhost:8192/getCategories",{method:"GET"})
        .then(data=>{
          console.log('====================================');
          console.log(data);
          console.log('====================================');
         
          return data.json()
        }).then(data=>{
            data.a.forEach(key=>{
              let modified = this.state.options.slice()
              modified.push(key)
                this.setState({
                options:modified
                
              })
           
          console.log(key)

         })
       }).catch(err=>{
         throw err
       })
      }
  
  


  directOptions = () => {
   let  k=[]
   for(let i = 0; i<this.state.options.length;i++){
     k.push(<option key={i}>{this.state.options[i]}</option>)
   }


  return k

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
        
          <h3>APEEEEE</h3>
        

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
      <div id="formContainer">f
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
