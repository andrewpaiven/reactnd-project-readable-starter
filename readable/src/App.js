import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu.js"
import PostDetail from "./components/PostDetail"
import { connect } from 'react-redux'
import { fetchAllPosts } from './actions/PostsActions'
import _ from 'lodash'
import { Route } from 'react-router-dom'
import AllPostsPage from './components/AllPostsPage'


class App extends Component {

    componentDidMount() {
        this.props.fetchAllPosts()
    }

    render() {
        return (
            <div>
                {/* Main Page */}
                <Route exact path="/" render={()=>(
                   <AllPostsPage/>
                )}/>

                {/* Posts of category*/}
                <Route exact path="/category/:category" render={()=>(
                    <AllPostsPage/>
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
        fetchAllPosts: () => dispatch(fetchAllPosts()),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
