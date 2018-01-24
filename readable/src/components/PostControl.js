import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { newPost, editPost } from '../actions/PostsActions'
import _ from 'lodash'
import uuidv1 from 'uuid'
import { openPostControl } from '../actions/PostsActions'

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
            left                       : '30%',
            right                      : '30%',
            bottom                     : '40%',
            border                     : '1px solid #ccc',
            background                 : '#fff',
        }
    }


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
                    PostCategory: value
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

    componentDidMount() {
        this.setState({
            postId: this.props.postControl.postId,
            postTitle: this.props.postControl.postTitle,
            postBody: this.props.postControl.postBody,
            postAuthor: this.props.postControl.postAuthor,
            postCategory: this.props.postControl.postCategory,
        })

        Modal.setAppElement('body');
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
                            <textarea style={{'overflow':'hidden'}} className="newPostTextAreaTitle" type="text" name="postTitle" value={this.state.postTitle} onChange={this.handleNewPostInputChange}/>
                        </div>
                        <div className="newPostLabelInputWrapper">
                            <label className="newPostModalLabel">Category</label>
                            <select value={this.props.postControl.postCategory} name="newPostSelectCategory" className="newPostCategorySelect" onChange={this.handleNewPostInputChange}>
                                {this.props.categories.map((category)=>{
                                    if(category.name === this.props.postControl.postCategory) {
                                        return <option selected value={category.name}>{category.name}</option>
                                    }
                                    else return <option value={category.name}>{category.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="newPostLabelInputWrapper">
                            <label className="newPostModalLabel">Author</label>
                            <textarea  style={{'overflow' :'hidden'}} className="newPostTextAreaAuthor" type="text" name="postAuthor" value={this.state.postAuthor} onChange={this.handleNewPostInputChange}/>
                        </div>
                        <div className="newPostLabelInputWrapper">
                            <label className="newPostModalLabel">Body</label>
                            <textarea  style={{'overflow' :'hidden'}} className="newPostTextAreaBody" type="text" name="postBody" value={this.state.postBody} onChange={this.handleNewPostInputChange}/>
                        </div>
                        <div style={{'text-align':'center'}}>
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

function mapDispatchToProps(dispatch) {
    return({
        newPost: (id,timestamp,title,body,author,category) => dispatch(newPost(id,timestamp,title,body,author,category)),
        openPostControl: status => dispatch(openPostControl(status)),
        editPost: (id,title,body) => dispatch(editPost(id,title,body))

    })
}

export default connect(mapStateToProps,mapDispatchToProps)(PostControl)
