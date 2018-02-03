/**
 * Created by apaivaer on 22/01/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import _ from 'lodash'
import { fetchAllPosts, fetchPostsByCategory, openPostControl, postsSortByFilter} from '../actions/PostsActions'
import PostControl from './PostControl'
import PostList from './PostList'
import Menu from './Menu'

class AllPostsPage extends Component {

    //React lifecycle methods
    componentWillMount() {
        this.props.openPostControl(false)
        this.setState({
            sortByFilter: null
        })
    }

    componentDidMount() {
        this.fetchPosts(this.props.categoryFilter)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.categoryFilter !== nextProps.categoryFilter) this.fetchPosts(nextProps.categoryFilter)
    }

    //Fetches posts by category
    fetchPosts = (category) => {
        if(category === 'All Posts' || !category) this.props.fetchAllPosts()
        else this.props.fetchPostsByCategory(category)
    }

    // Handles the opening of the modal for a new post, with pre filled data
    handleOpenNewPostModal = () => {

        //Prefills the category of the new post form with either the current category selected
        //or the first category in the list
        let categoryForNewPost;
        (!this.props.categoryFilter || this.props.categoryFilter === 'All Posts') ? categoryForNewPost = this.props.categories[0].name : categoryForNewPost = this.props.categoryFilter

        this.props.openPostControl(
            true, //Display Modal
            '', //Post Title
            '', //Post Author
            '', //Post Body
            categoryForNewPost, //Post Category
            null, //Post id
            'newPost' //Form mode (newPost/editPost)
        )
    }

    handleSortBy = (filter) => {
        this.props.postsSortByFilter(filter)
    }

    render() {
        return(
            <div className="container">
                <Menu/>
                <span className="headerPostList">{!this.props.categoryFilter ? 'All Posts' : this.props.categoryFilter}</span>
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
const mapStateToProps = (state,ownProps) => ({
    categoryFilter: ownProps.match.params.category,
    categories: _.values(state.categories),
    postControl: state.postControl,
})

const mapDispatchToProps = () => dispatch => ({
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    openPostControl: (showModal,postTitle,postAuthor,postBody,postCategory,postId,mode) => dispatch(openPostControl(showModal,postTitle,postAuthor,postBody,postCategory,postId,mode)),
    postsSortByFilter: filter => dispatch(postsSortByFilter(filter))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AllPostsPage))