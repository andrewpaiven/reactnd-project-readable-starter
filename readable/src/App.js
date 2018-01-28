import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import PostDetail from "./components/PostDetail"
import AllPostsPage from './components/AllPostsPage'

class App extends Component {

    render() {
        return (
            <div>
                {/* Main page */}
                <Route exact path="/" component={AllPostsPage}/>

                {/* Posts of category*/}
                <Route exact path="/category/:category" component={AllPostsPage}/>

                {/* Post Detail Page */}
                <Route exact path="/postdetail/:id" component={PostDetail}/>

            </div>
        )
    }
}

export default App
