import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu.js"
import PostList from "./components/PostList"
import * as CategoriesApi from "./api/categoriesAPI"
import { connect } from 'react-redux'
import { fetchPosts } from './actions/PostsActions'

class App extends Component {

    state = {
        categories: [],
    }

    componentDidMount() {
        this.loadCategories()
        this.props.fetchPosts()
    }

    loadCategories = () => {
        CategoriesApi.getAll().then((categories)=>{
            this.setState({
                categories: categories
            })

        })
    }



    render() {
        return (
            <div className="container">
                <Menu menuItems={this.state.categories}/>
                <span className="headerPostList">Fun Things</span>
                <button className="newPost">New Post</button>
                <PostList postList={this.props.postList}/>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    categories: state.categories,
    postList: state.postList
})

function mapDispatchToProps(dispatch) {
    return({
        fetchPosts: () => dispatch(fetchPosts())
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
