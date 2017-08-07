import React from "react"
import ReactDom from "react-dom"

class Body extends React.Component {
    constructor(){
        super(props)
        this.state ={
            category : this.props.category,   
            body: []
        }

        this.getBodyAsJSON()
    }

    getBodyAsJSON=()=>{
        fetch("http://localhost:8192/body",{method:"get"})
        .then((data)=>data.json())
        .then((data)=>{
            //borde få array av array eftersom "all" måste hanteras på olika categorier
            //TODO loopa genom o lägg till i this.state.body som renderas som <Kort {...loopedItem}/>

        })
    }


    
}



export default Body