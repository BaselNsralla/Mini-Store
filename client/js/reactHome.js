import React from "react"
import ReactDom from "react-dom"
import Head from "./components/head"
import Nav from "./components/nav"
import Body from "./components/body"
import SideBar from "./components/sideBar"




class Home extends React.Component {
    constructor(){
        super(props)
        

    }

    render() {
        return(
        <div class="wrapper">    
        <div class="headWrapper">    
            <Head />
        </div>
        <div class="contentWrapper">
            <div class="right">   
                <Nav />
                <Body category={this.props.category} />
            </div>

            <div class="left">    
                <SideBar category={this.props.category}/>
            </div>
        </div>
        </div>
        )
    }
}

ReactDOM.render(<Home category="all" />,document.getElementById("root"))