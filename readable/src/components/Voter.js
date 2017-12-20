/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'

class Voter extends Component {

    voteUp = () => {

    }

    voteDown = () => {

    }

    render() {
        return(
            <div>
                <span>{`Score: ${this.props.voteScore}`}</span>
                <button className="voterButton" onClick={this.voteUp}>+</button>
                <button className="voterButton" onClick={this.voteDown}>-</button>
            </div>
        )
    }
}

export default Voter
