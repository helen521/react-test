import React,{Component} from "react"
import {render} from "react-dom"
import ReactDOM from 'react-dom'
import './main.css'

class APP extends Component{
    render(){
        return(
            <div>
                hellop
            </div>
        )
    }
}

render(<APP/>,document.getElementById('app'))

