/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'
import { downVote } from '../api/postsAPI' //to be replaced with redux after vote up works fine
import { connect } from 'react-redux'
import { voteUpPost } from '../actions/PostsActions'

class Voter extends Component {

    voteDown = (id) => {
        downVote(id)
    }

    render() {
        return(
            <div>
                <span>{`Score: ${this.props.voteScore}`}</span>
                <button className="voterButton" onClick={()=>this.props.voteUp(this.props.postId)}>+</button>
                <button className="voterButton" onClick={()=>this.voteDown(this.props.postId)}>-</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return({
        voteUp: (id) => dispatch(voteUpPost(id)),
    })
}

export default connect(null,mapDispatchToProps)(Voter)
