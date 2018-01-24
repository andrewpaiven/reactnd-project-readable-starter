/**
 * Created by apaivaer on 19/12/2017.
 */
import React, { Component } from 'react';
import Voter from './PostVoter.js'
import { connect } from 'react-redux'
import { displayPostDetails } from '../actions/PostsActions'
import { Link } from 'react-router-dom'
import { deletePost } from '../actions/PostsActions'
import { openPostControl } from '../actions/PostsActions'
import { processTime } from "../helpers/TimeFunctions"


class Post extends Component {

    handlePostDeletion = () => {
        this.props.deletePost(this.props.id)
    }

    handlePostEdit = () => {
        this.props.openPostControl(
            true, //Display Modal
            this.props.title, //Post Title
            this.props.author, //Post Author
            this.props.body, //Post Body
            this.props.category, //Post Category
            this.props.id, //Post id
            "editPost" //Form mode (newPost/editPost)
        )
    }

    render() {
        return(
            <div>
                <h1 className="postTitle" onClick={()=>this.props.displayPostDetail(this.props.id)}>
                    <Link to={`/postDetail/${this.props.id}`} className="postTitle" style={{'text-decoration':'none','color':'inherit'}}> {`${this.props.title}`}</Link>
                </h1>
                <h2 className="postAuthor">{`by ${this.props.author}`}</h2>
                <Voter postId={this.props.id} voteScore={this.props.voteScore}/>
                <p className="postContent">{`${this.props.body}`}</p>
                <span className="postTimeStampAndCategory">{`Posted in ${this.props.category} on ${processTime(this.props.timestamp)}`}</span>
                <button onClick={this.handlePostEdit} className="postEdit">Edit Post</button>
                <button onClick={this.handlePostDeletion} className="postDelete">Delete Post</button>
            </div>

        )
    }
}

const mapDispatchToProps = () => dispatch => ({
    displayPostDetail: id => dispatch(displayPostDetails(id)),
    deletePost: id => dispatch(deletePost(id)),
    openPostControl: (showModal,postTitle,postAuthor,postBody,postCategory,postId,mode) => dispatch(openPostControl(showModal,postTitle,postAuthor,postBody,postCategory,postId,mode)),
})

export default connect(null,mapDispatchToProps)(Post)
