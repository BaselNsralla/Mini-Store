import React from "react"
import ReactDOM from "react-dom"
import fetchCategories from "../functions/fetch/fetchCategories.js"


class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            category: this.props.category
        }
        this.getListItems()
    }

    getListItems =()=>{
        fetchCategories(this,"items")
    }


    handleCategoryChoice = (category,event)=>{
        this.props.categoryChanger(category)
    }

    listifyItems = () => {
        if (this.state.items.length==0 ) {
            return null
        }
        return this.state.items.map((item,i) =>{
            return (
                <li key={i} onClick={(event)=>this.handleCategoryChoice(item,event)}>{item}</li>
            )   
        })

    }

    render(){
        console.log("side")
        return(
        <div className="nav">
            <ul>
                {this.listifyItems()}
            </ul>
        </div> )       
    }

}

export default SideBar