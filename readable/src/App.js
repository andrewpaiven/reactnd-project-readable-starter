import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu.js"
import PostList from "./components/PostList"
import { connect } from 'react-redux'
import { fetchPosts } from './actions/PostsActions'
import { fetchCategories} from './actions/CategoriesActions'
import _ from 'lodash'

class App extends Component {

    state = {
        currentTab: "All posts",
    }

    componentDidMount() {
        this.props.fetchCategories()
        this.props.fetchPosts()
    }

    render() {
        return (
            <div className="container">
                <Menu menuItems={this.props.categories}/>
                <span className="headerPostList">{this.state.currentTab}</span>
                <button className="newPost">New Post</button>
                <PostList postList={this.props.postList}/>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    categories: _.values(state.categories),
    postList: _.values(state.postList),
    currentTab: state.currentTab,
})

function mapDispatchToProps(dispatch) {
    return({
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategories: () => dispatch(fetchCategories()),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
