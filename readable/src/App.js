import React, { Component } from 'react';
import './App.css';
import Menu from "./components/Menu.js"
import PostList from "./components/PostList.js"

class App extends Component {

    menuItems = ['Fun Things','Literature','Health','Sports']

    postList  = [
        {
            title: "The best guapa in the world",
            author: "Andre Rocha",
            body: "The best guapa in the world is Paz Arroyo. Valencian by nature and dragon by right. She likes eating, fiesta, and gets angry when she cooks. If you keep away from her when she cooks you'll have a lovely time. She's just adorable",
            category: "fiesta",
            timestamp: "12/03/2018",
            voteScore: 1,
        },
        {
            title: "The best guapa in the world",
            author: "Andre Rocha",
            body: "The best guapa in the world is Paz Arroyo. Valencian by nature and dragon by right. She likes eating, fiesta, and gets angry when she cooks. If you keep away from her when she cooks you'll have a lovely time. She's just adorable",
            category: "fiesta",
            timestamp: "12/03/2018",
            voteScore: 1,
        }
    ]

    render() {
        return (
            <div className="container">
                <Menu menuItems={this.menuItems}/>
                <span className="headerPostList">Fun Things</span>
                <PostList postList={this.postList}/>
            </div>
        )

    }
}

export default App;
