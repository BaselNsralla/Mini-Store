import React from "react"
import ReactDOM from "react-dom"
import style from "../../style/style"


class Card extends React.Component{
    constructor(props){
        super(props)
        //vi kan göra så att price är en egen component som har funktionaliteter
        //som valuta omvandlig o sånt
    }

    render(){

        return (
            <div style={style.cardHolder}>
                <img src={this.props.imagePath}/>
                <p>{this.props.name}</p>
                <p>{this.props.price}</p>
            </div>

        )




    }



}


export default Card