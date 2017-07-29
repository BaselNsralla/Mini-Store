import React from 'react';
import ReactDOM from 'react-dom';
//vi testar utan ds här


class Category extends React.Component {

  constructor () {
    super()
    this.state = {
      options : []
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
          return JSON.parse(data)
        }).then(data=>{
             Object.keys(data).forEach(key=>{
              this.setState({
                options:this.state.options.push(<option>key</option>)
              })

             })  

        })
  }

  render () {
    return (
      <select>
        {this.state.options}
      </select>
    )
  }
}



class Form extends React.Component {
  getForm = ()=> {
    return (

      <form id="form" method="post" action="/createProduct">
        <h3>Category</h3>
        <Category  />

        <h3>Name:</h3>
        <input type="text"/>

        <h3>Price:</h3>
        <input type="text"/>
        <input type="submit" value="send"/>
      </form>

    )

  }

  render (){
    return (
      <div id="formContainer">
      <h1>Create Product</h1>
      {this.getForm()}
      </div>
    )


  }


}


ReactDOM.render(
  <Form />,
  document.getElementById('root')
)
