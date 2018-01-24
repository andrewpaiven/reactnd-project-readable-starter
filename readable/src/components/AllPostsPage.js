/**
 * Created by apaivaer on 22/01/2018.
 */
import React, { Component } from 'react'
import PostList from './PostList'
import Menu from './Menu'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchAllPosts, fetchPostsByCategory, newPost, openPostControl} from '../actions/PostsActions'
import PostControl from './PostControl'
class AllPostsPage extends Component {


    handleOpenNewPostModal = () => {

        let categoryForNewPost;
        this.props.categoryFilter === 'All Posts' ?
            categoryForNewPost = this.props.categories[0].name :
            categoryForNewPost = this.props.categoryFilter

        this.props.openPostControl(
            true, //Display Modal
            null, //Post Title
            null, //Post Author
            null, //Post Body
            categoryForNewPost, //Post Category
            null, //Post id
            'newPost' //Form mode (newPost/editPost)
        )
    }

    componentWillMount() {
        this.props.openPostControl(false)
    }

    componentDidMount() {
        if(this.props.categoryFilter !== 'All Posts') fetchPostsByCategory(this.props.categoryFilter)
        else this.props.fetchAllPosts()
    }

    render() {
        return(
            <div className="container">
                <Menu/>
                <span className="headerPostList">{this.props.categoryFilter}</span>
                <button className="newPost" onClick={()=>this.handleOpenNewPostModal()}>New Post</button>
                <PostList/>
                {this.props.postControl.showModal && <PostControl/>}
            </div>
    )}
}
const mapStateToProps = (state) => ({
    postList: _.values(state.postList),
    categoryFilter: state.categoryFilter,
    categories: _.values(state.categories),
    postControl: state.postControl,
})

function mapDispatchToProps(dispatch) {
    return({
        fetchAllPosts: () => dispatch(fetchAllPosts()),
        fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
        newPost: (id,timestamp,title,body,author,category) => dispatch(newPost(id,timestamp,title,body,author,category)),
        openPostControl: (showModal,postTitle,postAuthor,postBody,postCategory,postId,mode) => dispatch(openPostControl(showModal,postTitle,postAuthor,postBody,postCategory,postId,mode))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(AllPostsPage)