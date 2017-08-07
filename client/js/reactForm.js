import React from 'react';
import ReactDOM from 'react-dom';
import style from '../style/style'
import Category from './components/Category.js'
//vi testar utan ds här

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
        form : {
          option:"sport"
        },
      }
  }

  handleChange = (name,event) =>{
    console.log(name)
   
    let inputName = name
    let inputValue = event.target.value
    let formObj = this.state.form
    formObj[inputName] = inputValue
    this.setState({
      form:formObj
    })
  }

  handleImageChange = (name,event) =>{
    let reader = new FileReader();
    let file = event.target.files[0]
    let formObj = this.state.form
    formObj[name] = file
    this.setState({
      form:formObj
    })

  }


  handleSubmit = (event) =>{
    event.preventDefault()
    let item = this.state.form;
    let formData = new FormData()
    for(let key in item){
      formData.append(key,item[key])
    }
    // fetch("http://localhost:8192/create/addItem",{
    //   method: "post",
    //   headers:{
    //     "Content-type":"application/json"
    //   },
    //   body: JSON.stringify(item) 
    // })

      fetch("http://localhost:8192/create/addItem",{
      method: "post",
      body: formData
    })


  }

  getForm = ()=> {
    //all data som ska lagras som keys
    let name = "name"
    let price = "price"
    let currency = "currency"
    let pic = "pic"
    console.log(this.state)
     return (
      <form id="form" method="post" action="/createProduct" onSubmit={this.handleSubmit}>
        <Category handleChange={this.handleChange}  />
        <h3>Name:</h3>
        <input type="text" name="name" onChange={
          (event)=>this.handleChange(name,event)
          }/>
        <h3>Price:</h3>
        <input type="text" name="price" onChange={
          (event)=>this.handleChange(price,event)
          }/>
        <input type="text" name="currency" onChange={
          (event)=>this.handleChange(currency,event)
          }/>

        <input type="file" name="pic" onChange={
          (event)=>this.handleImageChange(pic,event)
          }/>   
        <input type="submit" value="send"  />
      </form>
    )
  }

  render (){
    console.log("something")
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
