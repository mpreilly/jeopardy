import React, { Component } from 'react';
import { Col } from "react-bootstrap";

class TopTile extends Component {

    render () {
        return (
            <Col >
                {/* <h3 style={{color: "#000000"}}>Hello</h3> */}
                <div style={
                        {backgroundColor: "#060CE9",
                        minHeight: "5.5em",
                        margin: "0em -0.5em",
                        padding: "0.5em 1em",
                        textAlign: "center",
                        // lineHeight: "5em",
                        fontFamily: "Arial",
                        fontWeight: "bold",
                        color: "white"}}>
                    {this.props.category ? this.props.category.toUpperCase() : "[No category]"}
                </div> 
            </Col> 
        )
    }
}

export default TopTile;