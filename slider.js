import React, { Component } from "react";
import './components.css';

class Slider extends Component {

    render() {
        return (
            <div className="doit">
                
                <div className="bpm space-bottom" >
                    <div className="form-group" style={{display: "flex", flexDirection: "column"}}>
                        <input
                            type="text"
                            className="form-control"
                            id="bpm"
                            value={this.props.bpm}
                            onChange={this.props.handleChanges}
                            name="bpm"
                            style={{ width: "67px", fontSize: "25px" }}
                        /><p style={{ marginTop: "12px", fontSize: "25px", marginLeft:"6px"}}>BPM</p>
                    </div>
                    
                    </div>
                <div >
                <input type="range" min="60" max="240" value={this.props.bpm} onChange={this.props.handleChange} style={{width:"270px", background:"none"}}/>
                    </div>
            </div>
        );
    }
}


export default Slider;