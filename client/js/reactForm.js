import React from 'react';
import ReactDOM from 'react-dom';
import style from '../style/style'
import Category from './components/Category.js'
//vi testar utan ds här

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
        form : {},
      }
  }

  handleChange = (event) =>{
    let inputName = event.target.name
    let inputValue = event.target.value
    let formObj = this.state.form
    formObj[inputName] = inputValue
    this.setState({
      form:formObj
    })
  }


  getForm = ()=> {
     return (
      <form id="form" method="post" action="/createProduct">
        <h3>APEEEEE</h3>
        <Category  />
        <h3>Name:</h3>
        <input type="text" name="name" onChange={this.handleChange}/>
        <h3>Price:</h3>
        <input type="text" name="price" onChange={this.handleChange}/>
        <input type="submit" value="send"  />
      </form>
    )
  }

  render (){
    console.log("ok")
    return (
     <div style={style.container}> 
      <div style ={style.formContainer} id="formContainer">
        <h1>Create Product</h1>
          {this.getForm()}
      </div>
        <div style={style.blank}>
        </div>
      </div>
    )
  }
} 


ReactDOM.render(
  <Form />,
  document.getElementById('root')
)
