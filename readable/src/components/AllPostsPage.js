/**
 * Created by apaivaer on 22/01/2018.
 */
import React, { Component } from 'react'
import PostList from './PostList'
import Menu from './Menu'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchAllPosts, fetchPostsByCategory, newPost} from '../actions/PostsActions'
import Modal from 'react-modal'
import uuidv1 from 'uuid'

class AllPostsPage extends Component {

    state = {
        openNewPostModal: false,
        newPostTitle: null,
        newPostCategory: this.props.categoryFilter,
        newPostAuthor: null,
        newPostBody: null,
    }

    modalStyle = {
        content : {
            top                        : '210px',
            left                       : '450px',
            right                      : '450px',
            bottom                     : '210px',
            border                     : '1px solid #ccc',
            background                 : '#fff',
        }
    }

    handleOpenNewPostModal = () => {
        this.props.categoryFilter === 'All Posts' ?
            this.setState({newPostCategory: this.props.categories[0].name}) :
            this.setState({newPostCategory: this.props.categoryFilter})

        this.setState({
            openNewPostModal: true,
            newPostTitle: null,
            newPostAuthor: null,
            newPostBody: null,
        })
    }

    handleCloseNewPostModal = () => {
        this.setState({
            openNewPostModal: false
        })
    }

    handleNewPostInputChange = (event) => {
        const value = event.target.value
        switch(event.target.name) {
            case 'postTitle':
                this.setState({
                    newPostTitle: value
                })
                break
            case 'newPostSelectCategory':
                this.setState({
                    newPostCategory: value
                })
                break
            case 'postAuthor':
                this.setState({
                    newPostAuthor: value
                })
                break
            case 'postBody':
                this.setState({
                    newPostBody: value
                })
                break
            default:
                return
        }
        return
    }

    handleNewPostSubmit = (event) => {
        event.preventDefault()
        this.props.newPost(uuidv1.v1(),Date.now(),this.state.newPostTitle,this.state.newPostBody,this.state.newPostAuthor,this.state.newPostCategory)
    }

    componentDidMount() {
        if(this.props.categoryFilter !== 'All Posts') fetchPostsByCategory(this.props.categoryFilter)
        else this.props.fetchAllPosts()
        Modal.setAppElement('body');
    }

    render() {
        return(
            <div className="container">
                <Menu/>
                <span className="headerPostList">{this.props.categoryFilter}</span>
                <button className="newPost" onClick={()=>this.handleOpenNewPostModal()}>New Post</button>
                <PostList/>
                <Modal isOpen={this.state.openNewPostModal} style={this.modalStyle}>
                    <div className="newPostModalDiv">
                        <form onSubmit={this.handleNewPostSubmit}>
                            <h5 className='commentPostTitle'>New Post</h5>
                            <div className="newPostLabelInputWrapper">
                                <label className="newPostModalLabel">Post Title</label>
                                <textarea style={{'overflow':'hidden'}} className="newPostTextAreaTitle" type="text" name="postTitle" onChange={this.handleNewPostInputChange}/>
                            </div>
                            <div className="newPostLabelInputWrapper">
                                <label className="newPostModalLabel">Category</label>
                                <select name="newPostSelectCategory" className="newPostCategorySelect" onChange={this.handleNewPostInputChange}>
                                    {this.props.categories.map((category)=>{
                                        if(category.name === this.props.categoryFilter) {
                                            return <option selected value={category.name}>{category.name}</option>
                                        }
                                        else return <option value={category.name}>{category.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="newPostLabelInputWrapper">
                                <label className="newPostModalLabel">Author</label>
                                <textarea  style={{'overflow' :'hidden'}} className="newPostTextAreaAuthor" type="text" name="postAuthor" onChange={this.handleNewPostInputChange}/>
                            </div>
                            <div className="newPostLabelInputWrapper">
                                <label className="newPostModalLabel">Body</label>
                                <textarea  style={{'overflow' :'hidden'}} className="newPostTextAreaBody" type="text" name="postBody" onChange={this.handleNewPostInputChange}/>
                            </div>
                            <div style={{'text-align':'center'}}>
                                <input className="commentSubmitButton" type="submit" value="Submit"/>
                                <button className="commentCancelButton" onClick={()=>this.handleCloseNewPostModal()}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
    )}
}
const mapStateToProps = (state) => ({
    postList: _.values(state.postList),
    categoryFilter: state.categoryFilter,
    categories: _.values(state.categories),
})

function mapDispatchToProps(dispatch) {
    return({
        fetchAllPosts: () => dispatch(fetchAllPosts()),
        fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
        newPost: (id,timestamp,title,body,author,category) => dispatch(newPost(id,timestamp,title,body,author,category))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(AllPostsPage)