/**
 * Created by apaivaer on 25/01/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { editComment, openCommentEditorAction } from '../actions/PostsActions'

class CommentControl extends Component {

    state = {
        id: null,
        author: null,
        body: null
    }

    modalStyle = {
        content : {
            top                        : '20%',
            left                       : '20%',
            right                      : '20%',
            bottom                     : '20%',
            border                     : '1px solid #ccc',
            background                 : '#fff',
        }
    }

    //React lifecycle methods
    componentDidMount() {
        this.setState({
            id: this.props.commentControl.id,
            author: this.props.commentControl.author,
            body: this.props.commentControl.body,
        })
        Modal.setAppElement('body');
    }

    // Event handling
    handleClose = () => {
        this.props.openCommentEditorAction(false,null,null)
    }

    handleCommentInputChange = (event) => {
        switch(event.target.name) {
            case 'commentBody':
                this.setState({
                    body: event.target.value
                })
                break
            default:
                break
        }
    }

    handleCommentEditSubmit = (event) => {
        event.preventDefault()
        this.props.editComment(this.state.id,Date.now(),this.state.body)
        this.handleClose()
    }

    render() {
        return(
            <Modal isOpen={this.props.commentControl.showModal} style={this.modalStyle}>
                <div>
                    <form onSubmit={this.handleCommentEditSubmit}>
                        <div className="newPostModalDiv">
                            <h5 className='commentPostTitle'>New Post</h5>
                            <div className="newCommentLabelInputWrapper">
                                <label className="newPostModalLabel">Author</label>
                                <textarea className="newCommentTextAreaTitle" type="text" name="commentAuthor" value={this.props.commentControl.author} onChange={this.handleCommentInputChange} disabled/>
                            </div>
                            <div className="newCommentLabelInputWrapper">
                                <label className="newPostModalLabel">Comment</label>
                                <textarea className="newCommentTextAreaTitle" type="text" name="commentBody" value={this.state.body} onChange={this.handleCommentInputChange}/>
                            </div>
                            <div style={{'textAlign':'center'}}>
                                <input className="commentSubmitButton" type="submit" value="Submit"/>
                                <button className="commentCancelButton" onClick={this.handleClose}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        )

    }
}

const mapStateToProps = state => ({
    commentControl: state.commentControl
})

const mapDispatchToProps = () => dispatch => ({
    editComment: (id,timestamp,body) => dispatch(editComment(id,timestamp,body)),
    openCommentEditorAction: (showModal,author,body) => dispatch(openCommentEditorAction(showModal,author,body))
})

export default connect(mapStateToProps,mapDispatchToProps)(CommentControl)