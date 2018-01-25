/**
 * Created by apaivaer on 21/01/2018.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteUpComment, voteDownComment } from '../actions/PostsActions'

class CommentVoter extends Component {

    render() {
        return(
            <div>
                <span>{`Score: ${this.props.voteScore}`}</span>
                <button className="voterButton" onClick={()=>this.props.voteUpComment(this.props.commentId)}>+</button>
                <button className="voterButton" onClick={()=>this.props.voteDownComment(this.props.commentId)}>-</button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return({
        voteUpComment: (id) => dispatch(voteUpComment(id)),
        voteDownComment: (id) => dispatch(voteDownComment(id))
    })
}

export default connect(null,mapDispatchToProps)(CommentVoter)
