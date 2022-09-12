import React, { Component } from "react";
import './components.css';
class Button extends Component {
    render() {
        return (
            <button className="centerized btn" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", width: "85px", marginTop: "50px"  }} onClick={this.props.handleClick} >
                {this.props.currentState ? "Stop" : "Start"}
            </button>
        );
    }
}
export default Button;
