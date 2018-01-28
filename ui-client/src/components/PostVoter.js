import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteUpPost, voteDownPost } from '../actions/PostsActions'

class PostVoter extends Component {

    render() {
        return(
            <div>
                <span>{`Score: ${this.props.voteScore}`}</span>
                <button className="voterButton" onClick={()=>this.props.voteUp(this.props.postId)}>+</button>
                <button className="voterButton" onClick={()=>this.props.voteDown(this.props.postId)}>-</button>
            </div>
        )
    }
}

const mapDispatchToProps = () => dispatch => ({
    voteUp: (id) => dispatch(voteUpPost(id)),
    voteDown: (id) => dispatch(voteDownPost(id))
})

export default connect(null,mapDispatchToProps)(PostVoter)
