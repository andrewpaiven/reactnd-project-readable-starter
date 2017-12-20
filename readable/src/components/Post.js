/**
 * Created by apaivaer on 19/12/2017.
 */
import React, { Component } from 'react';

class Post extends Component {

    render() {
        return(
            <div className="postDiv">
                <h1 className="postTitle">{`${this.props.title}`}</h1>
                <h2 className="postAuthor">{`by ${this.props.author}`}</h2>
                <p className="postContent">{`${this.props.body}`}</p>
                <h3 className="postTimeStampAndCategory">{`Posted in ${this.props.category} on ${this.props.timestamp}`}</h3>
            </div>
        )
    }
}

export default Post
