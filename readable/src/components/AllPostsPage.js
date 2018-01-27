/**
 * Created by apaivaer on 22/01/2018.
 */
import React, { Component } from 'react'
import PostList from './PostList'
import Menu from './Menu'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchAllPosts, fetchPostsByCategory, newPost, openPostControl, postsSortByFilter} from '../actions/PostsActions'
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

    handleSortBy = (filter) => {
        this.props.postsSortByFilter(filter)
    }

    fetchPosts = () => {
        if(this.props.categoryFilter !== 'All Posts') fetchPostsByCategory(this.props.categoryFilter)
        else this.props.fetchAllPosts()
    }

    componentWillMount() {
        this.props.openPostControl(false)
        this.setState({
            sortByFilter: null
        })
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        return(
            <div className="container">
                <Menu/>
                <span className="headerPostList">{this.props.categoryFilter}</span>
                <button className="newPost" onClick={()=>this.handleOpenNewPostModal()}>New Post</button>
                <div className="sortByDiv">Sort by:
                    <span className="sortBySelector" onClick={()=>this.handleSortBy('voteScore')}>Vote Score</span>
                    <span className="sortBySelector" onClick={()=>this.handleSortBy('timestamp')}>Timestamp</span>
                </div>
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
        openPostControl: (showModal,postTitle,postAuthor,postBody,postCategory,postId,mode) => dispatch(openPostControl(showModal,postTitle,postAuthor,postBody,postCategory,postId,mode)),
        postsSortByFilter: filter => dispatch(postsSortByFilter(filter))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(AllPostsPage)