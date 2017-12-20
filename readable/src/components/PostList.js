/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'
import Post from './Post'

class PostList extends Component {
    render() {
        return(
            <div className="postList">
                {this.props.postList.map((post)=>(
                    <Post
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        body={post.body}
                        category={post.category}
                        timestamp={post.timestamp}
                        voteScore={post.voteScore}
                        deleted={post.deleted}
                    />
                ))}
            </div>
        )
    }
}

export default PostList