/**
 * Created by apaivaer on 22/01/2018.
 */
import React, { Component } from 'react'
import PostList from './PostList'
import Menu from './Menu'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchAllPosts, fetchPostsByCategory } from '../actions/PostsActions'

class AllPostsPage extends Component {

    componentDidMount() {
        if(this.props.categoryFilter !== 'All Posts') fetchPostsByCategory(this.props.categoryFilter)
        else this.props.fetchAllPosts()
    }

    render() {
        return(
            <div className="container">
                <Menu/>
                <span className="headerPostList">{this.props.categoryFilter}</span>
                <button className="newPost">New Post</button>
                <PostList/>
            </div>
    )}
}
const mapStateToProps = (state) => ({
    postList: _.values(state.postList),
    categoryFilter: state.categoryFilter,
})

function mapDispatchToProps(dispatch) {
    return({
        fetchAllPosts: () => dispatch(fetchAllPosts()),
        fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(AllPostsPage)