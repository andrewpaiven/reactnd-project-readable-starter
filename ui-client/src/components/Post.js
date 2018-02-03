/**
 * Created by apaivaer on 19/12/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PostVoter from './PostVoter.js'
import { displayPostDetails, deletePost, openPostControl} from '../actions/PostsActions'
import { processTime } from "../helpers/TimeFunctions"

class Post extends Component {

    handlePostDeletion = () => {
        this.props.deletePost(this.props.post.id)
    }

    handlePostEdit = () => {
        this.props.openPostControl(
            true, //Display Modal
            this.props.post.title, //Post Title
            this.props.post.author, //Post Author
            this.props.post.body, //Post Body
            this.props.post.category, //Post Category
            this.props.post.id, //Post id
            "editPost" //Form mode (newPost/editPost)
        )
    }

    render() {
        return(
            <div>
                <h1 className="postTitle">
                    <Link to={`/${this.props.post.category}/${this.props.post.id}`} className="postTitle" style={{'textDecoration':'none','color':'inherit'}}> {`${this.props.post.title}`}</Link>
                </h1>
                <h2 className="postAuthor">{`by ${this.props.post.author}`}</h2>
                <p>{`Comments: ${this.props.post.commentCount}`}</p>
                <PostVoter postId={this.props.post.id} voteScore={this.props.post.voteScore}/>
                <p className="postContent">{`${this.props.post.body}`}</p>
                <span className="postTimeStampAndCategory">{`Posted in ${this.props.post.category} on ${processTime(this.props.post.timestamp)}`}</span>
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

export default withRouter(connect(null,mapDispatchToProps)(Post))
