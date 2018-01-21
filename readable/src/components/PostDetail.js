/**
 * Created by apaivaer on 20/01/2018.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Voter from './PostVoter'
import CommentVoter from './CommentVoter'
import { fetchPostComments, postComment } from '../actions/PostsActions'
import _ from 'lodash'
import uuidv1 from 'uuid'


class PostDetail extends Component {

    state = {
        commentModalOn: false
    }

    handleCloseModal = () => {
        this.setState({commentModalOn: false})
    }

    handleCommentSubmit = (event) => {
        event.preventDefault()
        this.props.postComment(uuidv1.v1(),Date.now(),this.state.commentBody,this.state.commentAuthor,this.props.postDetail.id)
    }

    handleNewCommentInputChange = (event) => {
        const targetName = event.target.name
        switch(targetName) {
            case 'commentBody':
                this.setState({
                    commentBody: event.target.value
                })
                break
            case 'commentAuthor':
                this.setState({
                    commentAuthor: event.target.value
                })
                break
            default:
                alert('error in new comment modal')
        }
    }

    componentDidMount() {
        this.props.fetchPostComments(this.props.postDetail.id)
    }

    processTime = (unixTime) => {
        let timeStamp = new Date(unixTime);
        let timeStampString = `${timeStamp.getDate()}\\${timeStamp.getMonth()}\\${timeStamp.getYear()} @ ${timeStamp.toISOString().slice(-13, -5)}`
        return timeStampString
    }

    render() {
        return(
            <div className="postList">
                <div className="postDiv">
                    <h1 className="postTitle">{`${this.props.postDetail.title}`}</h1>
                    <h2 className="postAuthor">{`by ${this.props.postDetail.author}`}</h2>
                    <Voter postId={this.props.postDetail.id} voteScore={this.props.postDetail.voteScore}/>
                    <p className="postContent">{`${this.props.postDetail.body}`}</p>
                    <button className="postEdit">Edit Post</button>
                    <button className="postDelete">Delete Post</button>
                    {this.props.postDetailComments.length !== 0 &&
                        <div>
                            <h3>Comments</h3>
                        </div>
                    }
                    <div>
                        <a onClick={()=>(this.setState({commentModalOn: true}))}>Add new comment</a>
                    </div>

                    {this.state.commentModalOn &&
                    <div style={{'margin-top':'20px'}}>
                        <h5 className='commentPostTitle'>New Comment</h5>
                        <form onSubmit={this.handleCommentSubmit}>
                            <p style={{'verticalAlign':'center'}}>
                                <label className="commentModalLabel">Comment</label>
                                <textarea  style={{'overflow' :'hidden'}} className="bodyPostModal" type="text" name="commentBody" onChange={this.handleNewCommentInputChange}/>
                            </p>
                            <label className="commentModalLabel">Author</label>
                            <input className="authorPostModal" type="text" name="commentAuthor" onChange={this.handleNewCommentInputChange}/>
                            <div style={{'text-align':'center'}}>
                                <input className="commentSubmitButton" type="submit" value="Submit"/>
                                <button className="commentCancelButton" onClick={this.handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    }
                    {this.props.postDetailComments.length !== 0 &&
                        this.props.postDetailComments.map((comment)=>(
                       <div className="commentDiv">
                           <p>Comment by {comment.author} on {this.processTime(comment.timestamp)}</p>
                           <p>{comment.body}</p>
                           <CommentVoter commentId={comment.id} voteScore={comment.voteScore}/>
                       </div>
                        ))
                    }
                    {this.props.postDetailComments.length === 0 &&
                    <h3 className="noComments">No comments for this post</h3>}
             </div>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    postDetail: state.postDetail,
    postDetailComments: _.values(state.postDetailComments)
})

const mapDispatchToProps = () => dispatch => ({
    fetchPostComments: (id) => dispatch(fetchPostComments(id)),
    postComment: (id,timestamp,body,author,parentId) => dispatch(postComment(id,timestamp,body,author,parentId))
})

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)


