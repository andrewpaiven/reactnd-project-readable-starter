/**
 * Created by apaivaer on 20/01/2018.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Voter from '../components/Voter'

class PostDetail extends Component {


    render() {
        return(
            <div className="postDetailContainer">
                <h1 className="postTitle">{`${this.props.postDetail.title}`}</h1>
                <h2 className="postAuthor">{`by ${this.props.postDetail.author}`}</h2>
                <Voter postId={this.props.id} voteScore={this.props.postDetail.voteScore}/>
                <p className="postContent">{`${this.props.postDetail.body}`}</p>
                <button className="postEdit">Edit Post</button>
                <button className="postDelete">Delete Post</button>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    postDetail: state.postDetail
})

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)


