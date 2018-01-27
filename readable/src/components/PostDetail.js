/**
 * Created by apaivaer on 20/01/2018.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentVoter from './CommentVoter'
import { fetchPostComments, postComment, openPostControl, deleteComment, editComment, openCommentEditorAction, getPost } from '../actions/PostsActions'
import _ from 'lodash'
import uuidv1 from 'uuid'
import Post from './Post'
import { processTime } from "../helpers/TimeFunctions"
import PostControl from './PostControl'
import CommentControl from './CommentControl'
import { withRouter } from 'react-router-dom';

class PostDetail extends Component {

    state = {
        commentAddFieldsOn: false
    }

    handleCloseModal = () => {
        this.setState({commentAddFieldsOn: false})
    }

    handleCommentSubmit = (event) => {
        event.preventDefault()
        this.props.postComment(uuidv1.v1(),Date.now(),this.state.commentBody,this.state.commentAuthor,this.props.postDetail.id)
        this.handleCloseModal()
    }

    handleEditComment = (author,body,id) => {
        this.props.openCommentEditorAction(
            true, //Show Modal
            author,
            body,
            id
        )
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
        this.props.getPost(this.props.postDetailId)
        this.props.fetchPostComments(this.props.postDetailId)
    }

    render() {
        return(
            <div className="postList">
                <div className="postDiv">
                    {this.props.postControl.showModal && <PostControl/>}
                    {this.props.postDetail && <Post
                        id={this.props.postDetail.id}
                        title={this.props.postDetail.title}
                        author={this.props.postDetail.author}
                        body={this.props.postDetail.body}
                        category={this.props.postDetail.category}
                        timestamp={this.props.postDetail.timestamp}
                        voteScore={this.props.postDetail.voteScore}
                        deleted={this.props.postDetail.deleted}
                        commentCount={this.props.postDetail.commentCount}
                    />}
                    {this.props.commentControl.showModal && <CommentControl/>}
                    {this.props.postDetailComments.length !== 0 &&
                    <div>
                        <h3>Comments</h3>
                    </div>
                    }
                    <div>
                        <a className="newCommentTitle" onClick={()=>(this.setState({commentAddFieldsOn: true}))}>Add new comment</a>
                    </div>

                    {this.state.commentAddFieldsOn &&
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
                            <p>Comment by {comment.author} on {processTime(comment.timestamp)}</p>
                            <p>{comment.body}</p>
                            <CommentVoter commentId={comment.id} voteScore={comment.voteScore}/>
                            <button onClick={() => this.handleEditComment(comment.author,comment.body,comment.id)} className="commentEditButton">Edit</button>
                            <button onClick={() => this.props.deleteComment(comment.id)} className="commentDeleteButton">Delete</button>
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

const mapStateToProps = (state,ownProps) => ({
    postDetail: state.postDetail,
    postDetailComments: _.values(state.postDetailComments),
    postControl: state.postControl,
    commentControl: state.commentControl,
    postDetailId: ownProps.match.params.id
})

const mapDispatchToProps = () => dispatch => ({
    fetchPostComments: id => dispatch(fetchPostComments(id)),
    postComment: (id,timestamp,body,author,parentId) => dispatch(postComment(id,timestamp,body,author,parentId)),
    openPostControl: (showModal,postTitle,postAuthor,postBody,postCategory,postId,mode) => dispatch(openPostControl(showModal,postTitle,postAuthor,postBody,postCategory,postId,mode)),
    deleteComment: id => dispatch(deleteComment(id)),
    editComment: (id,timestamp,body) => dispatch(editComment(id,timestamp,body)),
    openCommentEditorAction: (showModal,author,body,id) => dispatch(openCommentEditorAction(showModal,author,body,id)),
    getPost: id => dispatch(getPost(id))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail))


