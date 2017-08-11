import React from "react"
import ReactDOM from "react-dom"
import Card from "./card"
import style from "../../style/style"


class Body extends React.Component {
    constructor(props){
        super(props)
        this.state ={   
            body: null
        }

        this.getBodyAsJSON()
    }

    getBodyAsJSON=()=>{
        let urlSub = this.state.category 
        //antigen filtrera det som kom eller kör med urlSub
        fetch(`http://localhost:8192/body`,{method:"get"})
        .then((data)=>data.json())
        .then((data)=>{
            //borde få array av array eftersom "all" måste hanteras på olika categorier
            //TODO loopa genom o lägg till i this.state.body som renderas som <Kort {...loopedItem}/>
            this.setState({body: data})
        })
    }

    filterItems = (body,category) =>{
        if (category == "all" || body== null) {
            return body
        }
        let filtered ={}
        Object.keys(body).forEach(key=>{
            if (key == category) {
                filtered[key] = body[key]
            }
        })
        return filtered
    }


    cardifyJsonData = (data) =>{
        if (data == null) {
            return data
        }
        let cardsArray = []
        Object.values(data).forEach(jayson=>{
            Object.keys(jayson).forEach(itemKey=>{
                let item = jayson[itemKey]
                let props = item
                props["key"] =  itemKey
                cardsArray.push(<Card  {...props} />)

            })
        })

        return cardsArray


    }


    render(){
        console.log("other side")
        let cardsData = this.filterItems(this.state.body,this.props.category)
        return (
            <div style={style.bodyHolder}>
                {this.cardifyJsonData(cardsData)}
            </div>  
        )



    }


    
}



export default Body