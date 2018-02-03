import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import uuidv1 from 'uuid'
import Modal from 'react-modal'
import { newPost, editPost, openPostControl } from '../actions/PostsActions'

class PostControl extends Component {

    state = {
        postTitle: null,
        newPostCategory: this.props.categoryFilter,
        postAuthor: null,
        postBody: null,
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
            postId: this.props.postControl.postId,
            postTitle: this.props.postControl.postTitle,
            postBody: this.props.postControl.postBody,
            postAuthor: this.props.postControl.postAuthor,
            postCategory: this.props.postControl.postCategory,
        })
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    //Event Handling

    handleCloseNewPostModal = () => {
        this.props.openPostControl(false)
    }

    handleNewPostInputChange = (event) => {
        const value = event.target.value
        switch(event.target.name) {
            case 'postTitle':
                this.setState({
                    postTitle: value
                })
                break
            case 'newPostSelectCategory':
                this.setState({
                    postCategory: value
                })
                break
            case 'postAuthor':
                this.setState({
                    postAuthor: value
                })
                break
            case 'postBody':
                this.setState({
                    postBody: value
                })
                break
            default:
                return
        }
        return
    }

    handlePostSubmit = (event) => {
        event.preventDefault()

        if(this.props.postControl.mode === 'newPost') {
            this.props.newPost(uuidv1.v1(), Date.now(), this.state.postTitle, this.state.postBody, this.state.postAuthor, this.state.postCategory)
        }

        if(this.props.postControl.mode === 'editPost') {
            this.props.editPost(this.state.postId,this.state.postTitle,this.state.postBody)
        }
    }

    render() {
        return(
            <Modal isOpen={this.props.postControl.showModal} style={this.modalStyle}>
                <div className="newPostModalDiv">
                    <form onSubmit={this.handlePostSubmit}>
                        {this.props.postControl.mode === 'newPost' ?
                            <h5 className='commentPostTitle'>New Post</h5> :
                            <h5 className='commentPostTitle'>Edit Post</h5>
                        }
                        <div className="newPostLabelInputWrapper">
                            <label className="newPostModalLabel">Post Title</label>
                            <textarea className="newPostTextAreaTitle" type="text" name="postTitle" value={this.state.postTitle} onChange={this.handleNewPostInputChange}/>
                        </div>
                        <div className="newPostLabelInputWrapper">
                            <label className="newPostModalLabel">Category</label>
                            <select name="newPostSelectCategory" defaultValue={this.props.postControl.postCategory} className="newPostCategorySelect" onChange={this.handleNewPostInputChange} disabled={this.props.postControl.mode === 'editPost'}>
                                {this.props.categories.map((category)=>(
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="newPostLabelInputWrapper">
                            <label className="newPostModalLabel">Author</label>
                            <textarea  className="newPostTextAreaAuthor" type="text" name="postAuthor" value={this.state.postAuthor} onChange={this.handleNewPostInputChange} disabled={this.props.postControl.mode === 'editPost'}/>
                        </div>
                        <div className="newPostLabelInputWrapper">
                            <label className="newPostModalLabel">Body</label>
                            <textarea className="newPostTextAreaBody" type="text" name="postBody" value={this.state.postBody} onChange={this.handleNewPostInputChange}/>
                        </div>
                        <div style={{'textAlign':'center'}}>
                            <input className="commentSubmitButton" type="submit" value="Submit"/>
                            <button className="commentCancelButton" onClick={()=>this.handleCloseNewPostModal()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    categoryFilter: state.categoryFilter,
    categories: _.values(state.categories),
    postControl: state.postControl,
})

const mapDispatchToProps = () => dispatch => ({
    newPost: (id,timestamp,title,body,author,category) => dispatch(newPost(id,timestamp,title,body,author,category)),
    openPostControl: status => dispatch(openPostControl(status)),
    editPost: (id,title,body) => dispatch(editPost(id,title,body))
})

export default connect(mapStateToProps,mapDispatchToProps)(PostControl)
