/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import _ from 'lodash'

class PostList extends Component {
    render() {
        return(
            <div className="postList">
                {this.props.postList.map((post)=>(
                    <div className="postDiv">
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
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    postList: _.values(state.postList)
})

export default connect(mapStateToProps,null)(PostList)