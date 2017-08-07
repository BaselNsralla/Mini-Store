import React from "react"
import ReactDom from "react-dom"
import fetchCategories from "../functions/fetch/fetchCategories.js"


class SideBar extends React.Component{
    constructor(){
        super(props)
        this.state = {
            items: []
        }
        this.getListItems()
    }

    getListItems =()=>{
        fetchCategories(this,"items")
    }


    handleCategoryChoice = (category,event)=>{
        this.props.category = category

    }

    listifyItems = () => {
        return this.state.items.map((item,i) =>{
            return (
                <li key={i} onClick={(event)=>handleCategoryChoice(item,event)}>{item}</li>
            )   
        })

    }

    render(){
        <div class="nav">
            <ul>
                {this.listifyItems()}
            </ul>
        </div>        
    }

}

export default SideBar