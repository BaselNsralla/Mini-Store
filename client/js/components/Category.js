import React from 'react';
import ReactDOM from 'react-dom';
import style from '../../style/style'

export default class Category extends React.Component {

  constructor () {
    super()
    this.state = {
      options : [],
      name :"option"
    
    }
    this.getOptions()
    
  }
  getOptions =  () => {
    console.log("gettingOptions")
        fetch("http://localhost:8192/getCategories",{method:"GET"})
        .then(data=>{
          return data.json()
        }).then(data=>{
            data.a.forEach(key=>{
              let modified = this.state.options.slice()
              modified.push(key)
                this.setState({
                options:modified
                
              })
        })
       }).catch(err=>{
         throw err
       })
    }
  
  


  directOptions = () => {
    let  k=[]
    this.state.options.forEach((item,i)=>{
         k.push(<option key={i}>{item}</option>)
    })
    return k
  }

  selectionChange = (event) =>{
    let name = this.state.name
    this.props.handleChange(name,event)
  }
 

  render () {
     console.log("something")
    return (
      <div>
        <select onChange={this.selectionChange}>
          {this.directOptions()}
        </select>
     </div> 
    )
  }
}