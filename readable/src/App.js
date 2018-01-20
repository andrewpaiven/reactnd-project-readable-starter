import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu.js"
import PostList from "./components/PostList"
import PostDetail from "./components/PostDetail"
import { connect } from 'react-redux'
import { fetchPosts } from './actions/PostsActions'
import _ from 'lodash'
import { Route } from 'react-router-dom'

class App extends Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        return (
            <div>
                {/* Main Page */}
                <Route exact path="/" render={()=>(
                    <div className="container">
                        <Menu/>
                        <span className="headerPostList">{this.props.categoryFilter}</span>
                        <button className="newPost">New Post</button>
                        <PostList/>
                    </div>
                )}/>

                {/* Posts of category*/}
                <Route exact path="/category/:category" render={()=>(
                    <div className="container">
                        <Menu/>
                        <span className="headerPostList">{this.props.categoryFilter}</span>
                        <button className="newPost">New Post</button>
                        <PostList/>
                    </div>
                )}/>

                {/* Post Detail Page */}
                <Route exact path="/postDetail/:id" render={()=>(
                    <div className="container">
                        <Menu/>
                        {this.props.postDetail && <PostDetail/>}
                    </div>
                )}/>


            </div>



        )

    }
}

const mapStateToProps = (state) => ({
    categories: _.values(state.categories),
    postList: _.values(state.postList),
    categoryFilter: state.categoryFilter,
    postDetail: state.postDetail
})

function mapDispatchToProps(dispatch) {
    return({
        fetchPosts: () => dispatch(fetchPosts()),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
