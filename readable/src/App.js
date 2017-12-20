import React, { Component } from 'react';
import './App.css';
import Post from "./components/Post.js"

class App extends Component {

    render() {
        return (
            <div className="container">
                <div className="menuContainer">
                    <ul className="menu">
                        <li className="menuItem" style={{'font-family': 'Pacifico', 'font-size':'40px'}}>Readable</li>
                        <li className="menuItem">Fun Things</li>
                        <li className="menuItem">Life Topics</li>
                        <li className="menuItem">Philosophy</li>
                        <li className="menuItem">Literature</li>
                    </ul>
                </div>

                <div className="postList">
                    <Post
                        title="The best guapa in the world"
                        author="Andre Rocha"
                        body="The best guapa in the world is Paz Arroyo. Valencian by nature and dragon by right. She likes eating, fiesta, and gets angry when she cooks. If you keep away from her when she cooks you'll have a lovely time. She's just adorable"
                        category="fiesta"
                        timestamp="12/03/2018"
                    />
                    <Post
                        title="The best guapa in the world"
                        author="Andre Rocha"
                        body="The best guapa in the world is Paz Arroyo. Valencian by nature and dragon by right. She likes eating, fiesta, and gets angry when she cooks. If you keep away from her when she cooks you'll have a lovely time. She's just adorable"
                        category="fiesta"
                        timestamp="12/03/2018"
                    />
                    <Post
                        title="The best guapa in the world"
                        author="Andre Rocha"
                        body="The best guapa in the world is Paz Arroyo. Valencian by nature and dragon by right. She likes eating, fiesta, and gets angry when she cooks. If you keep away from her when she cooks you'll have a lovely time. She's just adorable"
                        category="fiesta"
                        timestamp="12/03/2018"
                    />
                    <Post
                        title="The best guapa in the world"
                        author="Andre Rocha"
                        body="The best guapa in the world is Paz Arroyo. Valencian by nature and dragon by right. She likes eating, fiesta, and gets angry when she cooks. If you keep away from her when she cooks you'll have a lovely time. She's just adorable"
                        category="fiesta"
                        timestamp="12/03/2018"
                    />
                </div>

            </div>
        )

    }
}

export default App;
