import React from "react"
import ReactDOM from "react-dom"
//import Head from "./components/head"
//import Nav from "./components/nav"
import Body from "./components/body"
import SideBar from "./components/sideBar"
import style from "../style/style"


class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            category: this.props.category
        }

    }

    render() {
        console.log("parent")
        return(
        <div className="wrapper" style={style.wrapper}>    
        <div className="headWrapper" style={style.headWrapper}>    
           { "<Head />"}
        </div>
        <div className="contentWrapper" style={style.contentWrapper}>
            <div className="right" style={style.right}>   
                {"<Nav />"}
                <Body category={this.state.category} />
            </div>

            <div className="left">    
                <SideBar category={this.state.category} categoryChanger ={(category)=>{
                        this.setState({category:category})
                    }
                  }
                />
            </div>
        </div>
        </div>
        )
    }
}

ReactDOM.render(<Home category="all" />,document.getElementById("root"))